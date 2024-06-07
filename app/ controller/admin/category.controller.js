const adminCategoryQuery = require("../../queries/admin/category.query.js");
const { Respons } = require("../../utils/constant.js");

exports.addCategory = async (req, res) => {
  try {
    var input = {};
    input.title = req.body.title ? req.body.title : null;
    input.langId = req.body.langId ? req.body.langId : 0;
    input.isPublished = req.body.isPublished ? req.body.isPublished : false;
    var result = await adminCategoryQuery.addCategoryQuery(input);
    res
      .status(200)
      .json({ code: Respons.Succes, msg: "Success!", data: result });
  } catch (error) {
    res.status(500).json({ code: Respons.ServerError, msg: error.message });
  }
};

exports.listCategory = async (req, res) => {
  try {
    var search = req.query.search ? req.query.search : "";
    var result = await adminCategoryQuery.listCategoryQuery(search);
    res
      .status(200)
      .json({ code: Respons.Succes, msg: "Success!", data: result });
  } catch (error) {
    res.status(500).json({ code: Respons.ServerError, msg: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    var input = {};

    var { id, title, isPublished, langId } = req.body;

    input = {
      id: id,
      title: title,
      isPublished: isPublished,
      langId: langId,
    };

    var result = await adminCategoryQuery.updateCategoryQuery(input);
    res.status(200).json({
      code: Respons.Succes,
      msg: "Success!",
      dataId: result,
    });
  } catch (error) {
    res.status(500).json({ code: Respons.ServerError, msg: error.message });
  }
};

exports.getByIdCategoryUser = async (req, res) => {
  try {
    var { id } = req.params;
    if (id) {
      var result = await adminCategoryQuery.getByIdCategoryQuery(id);
      res
        .status(200)
        .json({ code: Respons.Succes, msg: "Success!", data: result });
    } else {
      res.status(406).json({
        cod: Respons.NotFullOfContent,
        msg: "data not completed",
      });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    var id = req.body.id ? req.body.id : null;
    if (id != null) {
      var data = await adminCategoryQuery.deleteCategoryQuery(id);
      res
        .status(200)
        .json({ code: Respons.Succes, msg: "Success!", data: data });
    } else {
      res.status(500).json({
        code: Respons.ServerError,
        msg: "Maglumatlary doly dal!",
        data: false,
      });
    }
  } catch (error) {
    console.log("deleteCategory => ", error);
    res.status(500).json({ err: error.message });
  }
};
