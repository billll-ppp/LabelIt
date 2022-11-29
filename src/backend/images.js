const express = require("express");
const path = require("path");
const multer = require("multer");
const mysql = require("mysql2");
// var bodyParser = require("body-parser");

// router.use(bodyParser.json());

var storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }
}).array("myImage");

const router = express.Router();
router.use(express.static("./public"));

const db = mysql.createConnection({
  user: "root",
  host: "127.0.0.1",
  password: "",
  database: "bs_project_login"
});

router.post("/upload", function(req, res) {
  upload(req, res, function(err) {
    console.log("Request ---", req.body);
    console.log("Request file ---", req.files);
    //Here you get file.

    const userID = req.body.userID;
    var data_url = "";
    for (var x = 0; x < req.files.length; x++) {
      data_url = req.files[x].path;
      data_url = data_url.replace(/\\/g, "/");
      data_url = data_url.replace("public/uploads/", "");

      db.query(
        "INSERT INTO images VALUES (?, ?)",
        [data_url, userID],
        (err, result) => {
          if (err) {
            res.send({ err: err });
          }
          // else {
          //   res.send({ result: result });
          // }
        }
      );
    }

    if (!err) {
      return res.send(200).end();
    }
  });
});

module.exports = router;
