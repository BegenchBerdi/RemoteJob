const fileQueries = require("../queries/file.queries");
const { fileUpload } = require("../utils/fileOrImageUpload");
const { v4: uuidv4 } = require("uuid");

const { IMAGES_DIRECTORY, FILES_DIRECTORY } = require("../data/constants");
const { Respons } = require("./../utils/constant");

exports.imageUpload = async (req, res) => {
  try {
    let input = {};
    var image = req.files.image ? req.files.image : null;
    var imageName = image.name;

    const imageNameSegments = imageName.split(".");
    input.extension = imageNameSegments[imageNameSegments.length - 1];

    input.fileId = uuidv4();

    if (image != null && input.extension != null) {
      input.filePath = await fileUpload(
        image,
        input.fileId,
        input.extension,
        IMAGES_DIRECTORY
      );
      input.streamFile = null;

      await fileQueries.addFileQuery(input);
      res.status(200).json({
        code: Respons.Succes,
        msg: "Success!",
        filePath: input.filePath,
        fileId: input.fileId,
      });
    } else {
      res
        .status(500)
        .json({ code: Respons.NotFullOfContent, msg: "Maglumatlar doly dal!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: Respons.ServerError, msg: err.message });
  }
};

exports.fileUpload = async (req, res) => {
  try {
    let input = {};
    var file = req.files?.file ? req.files?.file : null;
    var fileName = file.name;

    const fileNameSegments = fileName.split(".");
    input.extension = fileNameSegments[fileNameSegments.length - 1];

    input.fileId = uuidv4();

    if (file != null && input.extension != null) {
      input.filePath = await fileUpload(
        file,
        input.fileId,
        input.extension,
        FILES_DIRECTORY
      );

      await fileQueries.addFileQuery(input);
      res.status(200).json({
        code: Respons.Succes,
        msg: "Success!",
        filePath: input.filePath,
        fileId: input.fileId,
      });
    } else {
      res
        .status(500)
        .json({ code: Respons.NotFullOfContent, msg: "Maglumatlar doly dal!" });
    }
  } catch (err) {
    console.log("fileUpload => ", err);
    res.status(500).json({ code: Respons.ServerError, msg: err.message });
  }
};
