const { query } = require("./../database/index");
const { queryFormatter } = require("../functions/queryFormatter");

exports.mainInsertQuery = async (tabelName, columns, params) => {
  try {
    const count = columns.length;
    const values = [];
    for (let i = 0; i < count; i++) {
      values.push(`?${i + 1}`);
    }
    const rawQuery = `Insert into ${tabelName} (${columns}) values(${values}) returning *;`;
    const formattedQuery = queryFormatter(rawQuery, params);
    const queryResult = await query(formattedQuery, []);
    return queryResult;
  } catch (e) {
    console.log("mainInsertQuery => ", e);
    return false;
  }
};

exports.mainUpdateQuery = async (tabelName, columns, params, where) => {
  try {
    const count = columns.length;
    const b = [];
    var k;
    for (let i = 0; i < count; i++) {
      var column = `"${columns[i]}"=?${i + 1}`;
      b.push(column);
      k = i + 1;
    }

    const rawQuery = `Update "${tabelName}" set ${b} where ${
      where ? `${where} = ?${k + 1}` : `id = ?${k + 1}`
    } returning *;`;
    const formattedQuery = queryFormatter(rawQuery, params);
    const queryResult = await query(formattedQuery);
    return queryResult;
  } catch (e) {
    console.log("mainUpdateQuery => ", e.message);
    return false;
  }
};

exports.mainDeleteQuery = async (tabelName, where_key, where_val) => {
  try {
    const rawQuery = `Delete from ${tabelName} where ${where_key}=$uuid$${where_val}$uuid$ returning *;`;
    const formattedQuery = queryFormatter(rawQuery, []);
    const queryResult = await query(formattedQuery);
    return queryResult;
  } catch (e) {
    console.log("mainDeleteQuery => ", e);
    return false;
  }
};
