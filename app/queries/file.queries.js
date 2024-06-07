const { getFileInfo } = require("../utils/infoFile");
const { queryFormatter } = require("../functions/queryFormatter");
const { query } = require("./../database/index");

exports.addFileQuery = async (input) => {
  try {
    var fileInfo = await getFileInfo(input.filePath + "." + input.extension);

    if (input.filePath != null) {
      rawQuery = ` insert into files (file_id, file_path, extension, size, duration) 
        values(?1, ?2, ?3, ?4, ?5) returning id;`;

      var formattedQuery = queryFormatter(rawQuery, [
        input.fileId,
        input.filePath,
        fileInfo?.fileExtension,
        fileInfo?.fileSizeInBytes,
        fileInfo?.duration,
      ]);

      var queryResult = await query(formattedQuery, []);
      return queryResult;
    } else {
      return console.log("File path not found");
    }
  } catch (e) {
    console.log("addFileQuery => ", e);
    return false;
  }
};
