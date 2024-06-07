const nodemailer = require("../config/nodemailer.config.js");
const config = require("../config/auth.config.js");
const queryAuth = require("../queries/auth.queries.js");
const { Respons } = require("../utils/constant.js");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signUpEmail = async (req, res) => {
  try {
    var { email, name, surname, password, verifiedPassword } = req.body;

    if (email && password) {
      if (password === verifiedPassword) {
        var confirmEmailCode = jwt.sign(
          {
            email: email,
            name: name,
            surname: surname,
            password: password,
          },
          config.secret,
          { expiresIn: 10 * 600 }
        );

        var hasUserWithEmail = await queryAuth.checkUsersWithEmail(email);
        if (hasUserWithEmail) {
          email && nodemailer.sendConfirmationEmail(email, confirmEmailCode);
          res.status(200).json({
            code: Respons.Succes,
            msg: "Success!",
            confirmToken: confirmEmailCode,
          });
        } else {
          console.log("email using => ", Respons.EmailUsing);
          res.status(500).json({
            code: Respons.EmailUsing,
            msg: "Bu e-poçtada öň ulanyjy hasaba alnypdyr! Başga e-poçta saýlamagyňyzy haýyş edýäris.",
          });
        }
      } else {
        console.log("Durli passwordlar => ", Respons.PasswordsDoNotMatch);
        res.status(500).json({
          code: Respons.PasswordsDoNotMatch,
          msg: "Passwordlar gabat belmeyar",
        });
      }
    } else {
      console.log("catch => ", err.message);
      res
        .status(500)
        .json({ code: Respons.NotFullOfContent, msg: "Maglumatlar doly dal!" });
    }
  } catch (error) {
    console.log("singupEmail => ".error);
    res.status(500).json({ code: Respons.ServerError, msg: error.message });
  }
};

exports.confirmEmail = async (req, res) => {
  var { confirmToken } = req.body;
  if (confirmToken != null) {
    jwt.verify(confirmToken, config.secret, async (error, decodedToken) => {
      if (error) {
        console.log("verify => ", error.message);
        res.status(500).json({
          code: Respons.Unauthorized,
          msg: "Tassyklama wagtynyz doldy!",
        });
      }

      if (decodedToken) {
        var user = await queryAuth.signupQuery(
          decodedToken.name,
          decodedToken.surname,
          decodedToken.email,
          bcrypt.hashSync(decodedToken.password, 8)
        );

        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 60 * 60 * 24 * 30 * 6,
        });
        delete user.password;
        delete user.status;

        user.id
          ? res.status(200).json({
              code: Respons.Succes,
              token: token,
              user: user,
              msg: "Success verified!",
            })
          : res.status(500).json({
              code: Respons.QueryError,
              msg: "Tassyklamada yalnyslyk!",
            });
      } else {
        res.status(500).json({
          code: Respons.TokenNotCorrect,
          msg: "Ugradylan maglumatlar dogry dal!",
        });
      }
    });
  } else {
    res.status(500).json({
      code: Respons.NotFullOfContent,
      msg: "No confirmation-email-code",
    });
  }
};

exports.signInEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      const user = await queryAuth.checkUserForLogin(email, null, null);
      if (user[0] && user[0].id) {
        var passwordIsValid = bcrypt.compareSync(password, user[0].password);
        if (!passwordIsValid) {
          return res.status(500).json({
            code: Respons.PasswordNotCorrect,
            msg: "Girizen parolynyz nädogry!",
          });
        }

        var token = jwt.sign({ id: user[0].id }, config.secret, {
          expiresIn: 60 * 60 * 24 * 30 * 6,
        }); // 6 month
        delete user[0].password;
        delete user[0].status;

        res.status(200).json({
          code: Respons.Succes,
          token: token,
          user: user[0],
        });
      } else {
        res
          .status(500)
          .json({ code: Respons.UserNotFound, msg: "Ulanyjy tapylmady." });
      }
    } else {
      res
        .status(500)
        .json({ code: Respons.NotFullOfContent, msg: "Maglumatlar doly dal." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: Respons.ServerError, msg: err.message });
  }
};

exports.forgotPasswordEmail = async (req, res) => {
  const email = req.body.email;
  if (email) {
    var hasUserWithEmail = await queryAuth.checkUserWithEmailForResetPassword(
      email,
      null,
      null
    );

    if (hasUserWithEmail) {
      const passwordResetToken = jwt.sign({ email: email }, config.secret, {
        expiresIn: 600,
      }); // 10 minute

      nodemailer.sendPasswordResetLink(email, passwordResetToken);
      res.status(200).json({
        code: Respons.Succes,
        msg: "Açarsözi dikeldiş salgysy e-poçtaňyza ugradyldy! Açarsözüňizi 10-minudyň dowamynda dikeldip bilersiňiz!",
      });
    } else {
      res.status(500).json({
        code: Respons.UserNotFound,
        msg: "Maglumatlary dogry girizmegiňizi haýyş edýäris.",
      });
    }
  } else {
    res
      .status(500)
      .json({ code: Respons.NotFullOfContent, msg: "Maglumatlar doly dal." });
  }
};

exports.changePasswordEmail = (req, res) => {
  const { password, passwordResetToken } = req.body;

  if (passwordResetToken != null && password != null) {
    jwt.verify(
      passwordResetToken,
      config.secret,
      async (error, decodedToken) => {
        if (error) {
          return res.status(500).json({
            code: Respons.TokenNotCorrect,
            msg: "10 minutdan geçdi. Açarsözüňiz dikeldilmedi!",
          });
        } else {
          var hasUserWithEmail = await queryAuth.changePasswordQuery(
            decodedToken.email,
            null,
            null,
            bcrypt.hashSync(password, 8)
          );

          if (hasUserWithEmail) {
            res
              .status(200)
              .json({ code: Respons.Succes, msg: "Success changed!" });
          } else {
            res.status(500).json({
              code: Respons.UserNotFound,
              msg: "Bu email ulanyan ulanyjymyz yok",
            });
          }
        }
      }
    );
  } else {
    res
      .status(500)
      .json({ code: Respons.NotFullOfContent, msg: "Maglumatlar doly dal!" });
  }
};
