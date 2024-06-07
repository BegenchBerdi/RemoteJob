const { query } = require("../../database/index");
const { queryFormatter } = require("../../functions/queryFormatter");
const mainQueries = require("../main.queries");

exports.addProductQuery = async (input) => {
  try {
    console.log(input);
    var data = await mainQueries.mainInsertQuery(
      "products",
      [
        "title",
        "about",
        "price",
        "phone",
        "image_path",
        "category_id",
        "lang_id",
      ],
      [
        input.title,
        input.about,
        input.price,
        input.phone,
        input.imagePath,
        input.categoryId,
        input.langId,
      ]
    );
    return data.rows[0] ? data.rows[0].id : false;
  } catch (error) {
    return error.message;
  }
};

exports.listProductQuery = async (limit, page) => {
  try {
    let rawQuery;
    let result = {};
    rawQuery = `select p.id, p.title, p.phone, c.title as "categoryName", p.view_count from 
    products p 
      left join 
    categories c 
      on c.id = p.category_id
      order by p.created_at desc 
    limit $l$${limit}$l$ offset $p$${limit * page}$p$
      `;

    var formattedQuery = queryFormatter(rawQuery, []);
    var { rows } = await query(formattedQuery);
    result.Content = rows;

    rawQuery = `select count(p.id) from 
    products p 
      left join 
    categories c 
      on c.id = p.category_id `;

    var queryResult = await query(rawQuery);
    result.count = queryResult?.rows[0]?.count
      ? Math.floor(queryResult.rows[0].count)
      : 0;
    return result;
  } catch (error) {
    return error.message;
  }
};

exports.updateProductQuery = async (input) => {
  try {
    var data = await mainQueries.mainUpdateQuery(
      "products",
      [
        "title",
        "about",
        "price",
        "phone",
        "image_path",
        "category_id",
        "lang_id",
      ],
      [
        input.title,
        input.about,
        input.price,
        input.phone,
        input.imagePath,
        input.categoryId,
        input.langId,
        input.id,
      ]
    );

    return data.rows[0].id;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

exports.getByIdProductQuery = async (id) => {
  try {
    let rawQuery;

    rawQuery = `select * from products where id = ?1`;
    var formattedQuery = queryFormatter(rawQuery, [id]);
    var { rows } = await query(formattedQuery);

    return rows[0];
  } catch (err) {
    console.log("error ", err.message);
    return err.message;
  }
};

exports.deleteProductQuery = async (id) => {
  try {
    let rawQuery;
    rawQuery = `delete from  products  where id = ?1 returning id`;

    var formattedQuery = queryFormatter(rawQuery, [id]);
    var { rows } = await query(formattedQuery, []);

    return rows[0] && rows[0]?.id ? rows[0].id : false;
  } catch (error) {
    return error.message;
  }
};
