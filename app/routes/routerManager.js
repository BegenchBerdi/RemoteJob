//---------------------ADMIN--------------------------------------------------
const adminHeader = require("./admin/header.routes");
const adminCategory = require("./admin/category.routes");
const adminProduct = require("./admin/products.routes");

//-------------------------auth---------------------------------------------------
const authRouter = require("./auth.routes");

//-------------------------Api---------------------------------------------------
const fileRouters = require("./file.routes");
const apiRouters = require("../routes/client/api.routes");

//------------------------other--------------------------------------------------
const { tokenCheck } = require("../middleware/authJwt");

module.exports = (app) => {
  //----------------------------admin----------------------------------
  app.use("/api/v1/admin/header", tokenCheck, adminHeader);
  app.use("/api/v1/admin/category", tokenCheck, adminCategory);
  app.use("/api/v1/admin/product", tokenCheck, adminProduct);

  //------------------------------auth--------------------------------------------
  app.use("/api/v1/auth", authRouter);

  //------------------------------FILES--------------------------------------------
  app.use("/api/v1/file", fileRouters);

  //---------------------------Api--------------------------------------------------
  app.use("/api/v1", apiRouters);
};
