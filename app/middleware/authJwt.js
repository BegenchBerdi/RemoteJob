const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const { Respons } = require("./../utils/constant.js");

const tokenCheck = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (token) {
      jwt.verify(token, config.secret, (error, data) => {
        if (error) {
          // forbitten -> gadagan edildi
          res.status(403).json({ code: Respons.Forbidden, msg: "Forbidden!" });
        } else {
          res.locals.decoded = data;
          next();
        }
      });
    } else {
      // Unauthorized --> rugsatsyz
      res
        .status(401)
        .json({ code: Respons.Unauthorized, msg: "Unauthorized!" });
    }
  } catch (e) {
    console.log("Check token => ", e);
    res.status(500).json({ code: Respons.ServerError, msg: err.message });
  }
};

module.exports = {
  tokenCheck,
};
