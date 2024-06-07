const { query } = require("../../database/index");
const { queryFormatter } = require("../../functions/queryFormatter");
const mainQueries = require("../../queries/main.queries");

exports.addHeaderQuery = async (input) => {
  try {
    let rawQuery;
    rawQuery = ` insert into header (title, logo) values (?1, ?2) returning id`;

    formatedQuery = queryFormatter(rawQuery, [input.title, input.logo]);
    const { rows } = await query(formatedQuery, []);
    return rows;
  } catch (error) {
    return error.message;
  }
};

exports.listHeaderQuery = async () => {
  try {
    let rawQuery;
    rawQuery = `select * from header`;

    var formattedQuery = queryFormatter(rawQuery, []);
    var { rows } = await query(formattedQuery);

    return rows;
  } catch (error) {
    return error.message;
  }
};

exports.updateHeaderQuery = async (input) => {
  try {
    var data = await mainQueries.mainUpdateQuery(
      "header",
      ["title", "logo"],
      [input.title, input.logo, input.id]
    );

    return data.rows[0].id;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

exports.getByIdHeaderQuery = async (id) => {
  try {
    let rawQuery;

    rawQuery = `select title, logo from header where id = ?1`;
    var formattedQuery = queryFormatter(rawQuery, [id]);
    var { rows } = await query(formattedQuery);

    return rows[0];
  } catch (err) {
    console.log("error ", err.message);
    return err.message;
  }
};

exports.deleteHeaderQuery = async (id) => {
  try {
    let rawQuery;
    rawQuery = `delete from  header  where id = ?1 returning id`;

    var formattedQuery = queryFormatter(rawQuery, [id]);
    var { rows } = await query(formattedQuery, []);

    return rows[0] && rows[0]?.id ? rows[0].id : false;
  } catch (error) {
    return error.message;
  }
};
