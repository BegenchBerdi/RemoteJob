const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const ffmpeg2 = require("@ffmpeg-installer/ffmpeg");
const sharp = require("sharp");
ffmpeg.setFfmpegPath(ffmpeg2.path);
const { APP_DIRECTORY, UPLOADS_PATH } = require("../data/constants");

exports.fileUpload = async (file, id, extention, FOLDER_DIRECTORY) => {
  return new Promise((resolve) => {
    const date = new Date();

    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    const stringDate = `${month}_${year}`;

    if (!fs.existsSync(APP_DIRECTORY + UPLOADS_PATH + FOLDER_DIRECTORY + "/")) {
      fs.mkdirSync(APP_DIRECTORY + UPLOADS_PATH + FOLDER_DIRECTORY + "/");
    }

    if (
      !fs.existsSync(
        APP_DIRECTORY + UPLOADS_PATH + FOLDER_DIRECTORY + "/" + stringDate + "/"
      )
    ) {
      fs.mkdirSync(
        APP_DIRECTORY + UPLOADS_PATH + FOLDER_DIRECTORY + "/" + stringDate + "/"
      );
    }

    if (
      !fs.existsSync(
        APP_DIRECTORY +
          UPLOADS_PATH +
          FOLDER_DIRECTORY +
          "/" +
          stringDate +
          "/" +
          id +
          "/"
      )
    ) {
      fs.mkdirSync(
        APP_DIRECTORY +
          UPLOADS_PATH +
          FOLDER_DIRECTORY +
          "/" +
          stringDate +
          "/" +
          id +
          "/"
      );
    }

    const pathMV =
      APP_DIRECTORY +
      UPLOADS_PATH +
      FOLDER_DIRECTORY +
      "/" +
      stringDate +
      "/" +
      id;
    console.log(pathMV + "." + extention);
    file.mv(pathMV + "." + extention, async (error) => {
      if (error) {
        console.log("file.mv => ", error);
        resolve(false);
      } else {
        const isImage =
          extention.toUpperCase() === "JPG" ||
          extention.toUpperCase() === "JPEG" ||
          extention.toUpperCase() === "PNG" ||
          extention.toUpperCase() === "WEBP";

        resolve(
          UPLOADS_PATH +
            FOLDER_DIRECTORY +
            "/" +
            stringDate +
            "/" +
            id +
            "/" +
            id
        );
      }
    });
  });
};
