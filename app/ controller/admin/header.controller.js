const adminHeaderQuery = require("../../queries/admin/header.query.js");
const { Respons } = require("../../utils/constant.js");

exports.addHeaderUser = async (req, res) => {
  try {
    var input = {};
    input.title = req.body.title ? req.body.title : null;
    input.logo = req.body.logo ? req.body.logo : null;
    var result = await adminHeaderQuery.addHeaderQuery(input);
    res
      .status(200)
      .json({ code: Respons.Succes, msg: "Success!", data: result[0].id });
  } catch (error) {
    res.status(500).json({ code: Respons.ServerError, msg: error.message });
  }
};

exports.listHeader = async (req, res) => {
  try {
    var result = await adminHeaderQuery.listHeaderQuery();
    res
      .status(200)
      .json({ code: Respons.Succes, msg: "Success!", data: result });
  } catch (error) {
    res.status(500).json({ code: Respons.ServerError, msg: error.message });
  }
};

exports.updateHeader = async (req, res) => {
  try {
    var input = {};
    var { id, title, logo } = req.body;

    input = {
      id: id,
      title: title,
      logo: logo,
    };

    var result = await adminHeaderQuery.updateHeaderQuery(input);
    res.status(200).json({
      code: Respons.Succes,
      msg: "Success!",
      dataId: result,
    });
  } catch (error) {
    res.status(500).json({ code: Respons.ServerError, msg: error.message });
  }
};

exports.getByIdHeaderUser = async (req, res) => {
  try {
    var { id } = req.params;
    if (id) {
      var result = await adminHeaderQuery.getByIdHeaderQuery(id);
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

exports.deleteHeader = async (req, res) => {
  try {
    var id = req.body.id ? req.body.id : null;
    if (id != null) {
      var data = await adminHeaderQuery.deleteHeaderQuery(id);
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
    console.log("deleteHeader => ", error);
    res.status(500).json({ err: error.message });
  }
};
