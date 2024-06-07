const { queryFormatter } = require("../../functions/queryFormatter");
const { query } = require("../../database/index");
const { generaterQueryText } = require("../../functions/generaterForSearch");

exports.ListClientProductQuery = async (limit, page, search, category_id) => {
  try {
    let origin_search = search;
    generateSearch = generaterQueryText(search);
    let rawQuery;
    let result = {};
    rawQuery = `
        select p.id, p.title, p.price, p.image_path, p.view_count, p.phone, to_char( p.created_at, 'DD.MM.YYYY') as created_at  from  products p
       where p.id is not null 
       ${category_id != null ? `and p.category_id = $g$${category_id}$g$` : ``}
       ${
         search
           ? ` and ( p.title ILIKE '${origin_search}%' or
                    to_tsvector( p.title) @@ to_tsquery(  $s$${generateSearch}$s$) 
                  )`
           : ``
       }
        order by 
        case when p.title ILIKE '${origin_search}%' then 0 else 1 end,
        p.created_at desc 
        limit $l$${limit}$l$ offset $p$${limit * page}$p$`;

    formatedQuery = queryFormatter(rawQuery, []);
    console.log(formatedQuery);
    var queryResult = await query(formatedQuery);

    result.Contents = queryResult.rows;

    rawQuery = `
        select count(p.id) from products p
        where p.id is not null 
       ${category_id != null ? `and p.category_id = ${category_id}` : ``}
       ${
         search
           ? ` and ( p.title ILIKE '${origin_search}%' or
                    to_tsvector( p.title) @@ to_tsquery(  $s$${generateSearch}$s$) 
                  )`
           : ``
       }
        `;
    var queryResult = await query(rawQuery);
    result.count = queryResult?.rows[0]?.count
      ? Math.floor(queryResult.rows[0].count)
      : 0;
    return result;
  } catch (err) {
    console.log("ListClientProductQuery => ", err);
    return false;
  }
};

exports.getByIdClientProductQuery = async (id) => {
  try {
    let rawQuery;
    rawQuery = `select p.id, p.title, p.price, p.image_path, p.phone, p.about,
        to_char( p.created_at, 'DD.MM.YYYY') as created_at  from  products p  where id = ?1 `;

    formatedQuery = queryFormatter(rawQuery, [id]);
    const { rows } = await query(formatedQuery, []);

    rawQuery = `update products set view_count = view_count + 1 where id = ?1; `;
    var formatedQuery = queryFormatter(rawQuery, [id]);
    query(formatedQuery, []);
    return rows ? rows : false;
  } catch (error) {
    return error.message;
  }
};
