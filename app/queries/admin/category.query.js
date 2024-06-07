const { query } = require("../../database/index");
const { queryFormatter } = require("../../functions/queryFormatter");
const mainQueries = require("../main.queries");

exports.addCategoryQuery = async (input) => {
  try {
    console.log(input);
    var data = await mainQueries.mainInsertQuery(
      "categories",
      ["title", "lang_id", "is_published"],
      [input.title, input.langId, input.isPublished]
    );
    return data.rows[0] ? data.rows[0].id : false;
  } catch (error) {
    return error.message;
  }
};

exports.listCategoryQuery = async (search) => {
  try {
    let rawQuery;
    rawQuery = `select title, lang_id, is_published, created_at from categories`;

    var formattedQuery = queryFormatter(rawQuery, []);
    var { rows } = await query(formattedQuery);

    return rows;
  } catch (error) {
    return error.message;
  }
};

exports.updateCategoryQuery = async (input) => {
  try {
    var data = await mainQueries.mainUpdateQuery(
      "categories",
      ["title", "lang_id", "is_published"],
      [input.title, input.langId, input.isPublished, input.id]
    );

    return data.rows[0].id;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

exports.getByIdCategoryQuery = async (id) => {
  try {
    let rawQuery;

    rawQuery = `select title, is_published, lang_id, created_at from categories where id = ?1`;
    var formattedQuery = queryFormatter(rawQuery, [id]);
    var { rows } = await query(formattedQuery);

    return rows[0];
  } catch (err) {
    console.log("error ", err.message);
    return err.message;
  }
};

exports.deleteCategoryQuery = async (id) => {
  try {
    let rawQuery;
    rawQuery = `delete from  categories  where id = ?1 returning id`;

    var formattedQuery = queryFormatter(rawQuery, [id]);
    var { rows } = await query(formattedQuery, []);

    return rows[0] && rows[0]?.id ? rows[0].id : false;
  } catch (error) {
    return error.message;
  }
};
