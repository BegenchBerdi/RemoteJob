const { queryFormatter } = require("./../functions/queryFormatter");
const { query } = require("./../database/index");

exports.checkUsersWithEmail = async (email) => {
  try {
    let rawQuery = `select id from users where email = ?1;`;
    var formatedQuery = queryFormatter(rawQuery, [email]);
    var { rows } = await query(formatedQuery, []);

    return rows && rows[0] && rows[0].id ? false : true;
  } catch (err) {
    console.log("checkUsersWithEmail => ", err);
    return err;
  }
};

exports.signupQuery = async (name, surname, email, password) => {
  try {
    let rawQuery = `insert into users(name, surname, email, password) 
                    values(?1, ?2, ?3, ?4) returning *;`;
    var formateddQuery = queryFormatter(rawQuery, [
      name,
      surname,
      email,
      password,
    ]);
    var { rows } = await query(formateddQuery, []);

    return rows && rows[0] && rows[0].id ? rows[0] : false;
  } catch (err) {
    console.log("singupQuery => ", err);
    return false;
  }
};

exports.checkUserForLogin = async (email, phone) => {
  try {
    let rawQuery, formatedQuery;
    if (email != null) {
      rawQuery = `select id, name, surname, email, password, avatar_path
              from users u
              where email = ?1;`;
      formatedQuery = queryFormatter(rawQuery, [email]);
      let { rows } = await query(formatedQuery, []);

      return rows;
    } else if (phone != null) {
      rawQuery = `select id, name, surname, email, password, avatar_path
              from users
              where  phone = ?1;`;
      formatedQuery = queryFormatter(rawQuery, [phone]);
      let { rows } = await query(formatedQuery, []);
      return rows;
    }
  } catch (err) {
    console.log("checkUserForLogin => ", err);
    return err;
  }
};

exports.checkUserWithEmailForResetPassword = async (email) => {
  try {
    let rawQuery, formatedQuery;
    if (email != null) {
      rawQuery = `select id from users where email = ?1;`;
      formatedQuery = queryFormatter(rawQuery, [email]);
      const { rows } = await query(formatedQuery, []);

      return rows && rows[0]?.id ? true : false;
    } else {
      return false;
    }
  } catch (err) {
    console.log("checkUserWithEmailForResetPassword => ", err);
    return err;
  }
};

exports.changePasswordQuery = async (email, hashPassword) => {
  try {
    let rawQuery, formateddQuery;
    if (email != null) {
      rawQuery = `update users set password = ?1 where email = ?2 returning id;`;
      formateddQuery = queryFormatter(rawQuery, [hashPassword, email]);
      const { rows } = await query(formateddQuery, []);

      return rows && rows[0]?.id ? rows[0]?.id : false;
    } else {
      return false;
    }
  } catch (err) {
    console.log("insertUserQuery => ", err);
    return false;
  }
};
