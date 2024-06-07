const apiQueries = require("../../queries/client/api.queries.js");
const { Respons } = require("../../utils/constant.js");

exports.ListProductClient = async (req, res) => {
  try {
    var search = req.query.search ? req.query.search : "";
    var limit = req.query.limit ? req.query.limit : 20;
    var page = req.query.page ? req.query.page : 0;
    var { category_id } = req.query;
    var result = await apiQueries.ListClientProductQuery(
      limit,
      page,
      search,
      category_id
    );

    res
      .status(200)
      .json({ code: Respons.Succes, msg: "Success!", data: result });
  } catch (err) {
    console.log("ListProductClient => ", err.message);
    res.status(500).json({ code: Respons.ServerError, msg: err.message });
  }
};

exports.getByIdProduct = async (req, res) => {
  try {
    var id = req.params.id ? req.params.id : null;
    if (id) {
      var result = await apiQueries.getByIdClientProductQuery(id);

      res
        .status(200)
        .json({ code: Respons.Succes, msg: "Success!", data: result });
    } else {
      res.status(403).json({
        code: Respons.NotFullOfContent,
        msg: "Success!",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};
