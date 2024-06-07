const adminProductQueries = require("../../queries/admin/product.query.js");
const { Respons } = require("../../utils/constant.js");

exports.addProduct = async (req, res) => {
  try {
    var input = {};
    input.title = req.body.title ? req.body.title : null;
    input.price = req.body.price ? req.body.price : 0;
    input.categoryId = req.body.categoryId ? req.body.categoryId : null;
    input.phone = req.body.phone ? req.body.phone : null;
    input.langId = req.body.langId ? req.body.langId : null;
    input.about = req.body.about ? req.body.about : null;
    input.imagePath = req.body.imagePath ? req.body.imagePath : null;
    var result = await adminProductQueries.addProductQuery(input);
    res
      .status(200)
      .json({ code: Respons.Succes, msg: "Success!", data: result });
  } catch (error) {
    res.status(500).json({ code: Respons.ServerError, msg: error.message });
  }
};

exports.lisProduct = async (req, res) => {
  try {
    var limit = req.query.limit ? req.query.limit : 20;
    var page = req.query.page ? req.query.page : 0;
    var result = await adminProductQueries.listProductQuery(limit, page);
    res
      .status(200)
      .json({ code: Respons.Succes, msg: "Success!", data: result });
  } catch (error) {
    res.status(500).json({ code: Respons.ServerError, msg: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    var input = {};
    input.id = req.body.id ? req.body.id : null;
    input.title = req.body.title ? req.body.title : null;
    input.price = req.body.price ? req.body.price : 0;
    input.categoryId = req.body.categoryId ? req.body.categoryId : null;
    input.phone = req.body.phone ? req.body.phone : null;
    input.langId = req.body.langId ? req.body.langId : null;
    input.about = req.body.about ? req.body.about : null;
    input.imagePath = req.body.imagePath ? req.body.imagePath : null;
    if (input.id != null) {
      var result = await adminProductQueries.updateProductQuery(input);
      res.status(200).json({
        code: Respons.Succes,
        msg: "Success!",
        dataId: result,
      });
    } else {
      res.status(403).json({
        code: Respons.Succes,
        msg: "Data not completed!",
        dataId: result,
      });
    }
  } catch (error) {
    res.status(500).json({ code: Respons.ServerError, msg: error.message });
  }
};

exports.getByIdProduct = async (req, res) => {
  try {
    var { id } = req.params;
    if (id) {
      var result = await adminProductQueries.getByIdProductQuery(id);
      res
        .status(200)
        .json({ code: Respons.Succes, msg: "Success!", data: result });
    } else {
      res.status(406).json({
        cod: Respons.NotFullOfContent,
        msg: "Maglumatlarynyz doly dal",
      });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    var id = req.body.id ? req.body.id : null;
    if (id != null) {
      var data = await adminProductQueries.deleteProductQuery(id);
      res
        .status(200)
        .json({ code: Respons.Succes, msg: "Success!", data: data });
    } else {
      res.status(403).json({
        code: Respons.ServerError,
        msg: "Maglumatlary doly dal!",
        data: false,
      });
    }
  } catch (error) {
    console.log("Error deleteProduct => ", error);
    res.status(500).json({ err: error.message });
  }
};
