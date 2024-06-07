require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const FileUpload = require("express-fileupload");
const morgan = require("morgan");
const path = require("path");

const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerJSDocs = YAML.load("./api.yaml");

const app = express();

var corsOptions = { origin: "*" };
app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));

app.use("/uploads", express.static("/mnt"));
app.use("/uploads", express.static(path.join(__dirname, "Uploads")));

app.use(
  FileUpload({
    limits: { filesize: 5000 * 1024 * 1024 },
  })
);

const PORT = process.env.PORT || 8080;
var server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
require("./app/routes/routerManager")(app);
