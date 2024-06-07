const fs = require("fs");
const path = require("path");
const ffprobe = require("ffprobe");
const ffprobeStatic = require("ffprobe-static");
const { APP_DIRECTORY } = require("../data/constants");

exports.getFileInfo = async (filePath) => {
  try {
    filePath = APP_DIRECTORY + filePath;

    var result = {};
    const { size: fileSizeInBytes } = fs.statSync(filePath);
    const fileExtension = path.extname(filePath);
    const fileName = path.basename(filePath, fileExtension);

    result.fileSizeInBytes = fileSizeInBytes;
    result.fileExtension = fileExtension;
    result.fileName = fileName;

    if (
      result.fileExtension === ".jpeg" ||
      result.fileExtension === ".jpg" ||
      result.fileExtension === ".png" ||
      result.fileExtension === ".webp" ||
      result.fileExtension === ".mp4" ||
      result.fileExtension === ".avi"
    ) {
      var data = await new Promise((resolve, reject) => {
        ffprobe(filePath, { path: ffprobeStatic.path }, (err, info) => {
          if (!err) {
            const width = info?.streams[0]?.width;
            const height = info?.streams[0]?.height;
            const duration = Math.round(info?.streams[0]?.duration);
            resolve({ width, height, duration });
          } else {
            console.log("ffprobe => ", err);
            reject(err);
          }
        });
      });

      result.width = data?.width;
      result.height = data?.height;
      result.duration = data?.duration;
    }

    return result;
  } catch (error) {
    console.log("infoFile catch => ", error);
  }
};

exports.getFileInOnlySizeAndExtension = async (filePath) => {
  try {
    filePath = APP_DIRECTORY + filePath;
    var result = {};
    const { size: fileSizeInBytes } = fs.statSync(filePath);
    const fileExtension = path.extname(filePath);
    result.fileSizeInBytes = fileSizeInBytes;
    result.fileExtension = fileExtension;
    return result;
  } catch (error) {
    console.log("infoFile catch FILE => ", error);
  }
};
