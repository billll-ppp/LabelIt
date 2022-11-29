// import React from "react";
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
var images = require("./images");

const app = express();
app.use((_, res, next) => {
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});
app.use(express.json());
app.use(cors());
app.use("/", images);

const db = mysql.createConnection({
  user: "root",
  host: "127.0.0.1",
  password: "", //depend on your implement
  database: "bs_project_login"
});

app.post("/login/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
        return;
      }
    }
  );

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        if (result.length > 0) {
          res.send({
            token: result[0].userID
          });
        } else {
          res.send({ message: "Wrong user or password." });
        }
      }
    }
  );
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        if (result.length > 0) {
          res.send({
            token: result[0].userID
          });
        } else {
          res.send({ message: "Wrong user or password." });
        }
      }
    }
  );
});

// var userID;

// app.post("/myImages", (req, res) => {
//   userID = req.body.userID;
//   console.log("Got user ID: " + userID);
// });

app.get("/myimages", (req, res) => {
  // console.log(req);
  let userID = req.query.userID;

  db.query(
    "SELECT data_url FROM images WHERE userID = ?",
    [userID],
    (err, result) => {
      console.log(err);
      console.log(result);
      if (err) {
        console.log(err);
        res.send({ err: err });
      } else {
        if (result.length > 0) {
          console.log(result);
          res.send({ res: result });
        } else {
          console.log("No pics");
          res.send({ message: "No pics found." });
        }
      }
    }
  );
});

app.post("/mission", function(req, res) {
  const images = req.body.image;
  const userID = req.body.creator_userID;
  var moment = require("moment");
  var currentMoment = moment().format("YYYY-MM-DD:hh:mm:ss");
  var missionID;

  db.query(
    "INSERT INTO missions (userID, create_time, mission_status) VALUES (?, ?, ?)",
    [userID, currentMoment, "N"],
    (err, res) => {
      if (err) throw err;
      // console.log(err);
      // res.error(err);
    }
  );

  db.query(
    "SELECT missionID FROM missions WHERE create_time = ?",
    [currentMoment],
    (err, res) => {
      // console.log(err);
      console.log(res);
      if (err) {
        console.log(err);
        res.error(err);
      } else {
        if (res.length > 0 && res.length === 1) {
          console.log(res);
          missionID = res[0].missionID;
          for (var i = 0; i < images.length; i++) {
            var std_path = images[i].src;
            //Because I set the path format in the upload section first, and this is a foreign key...
            std_path = std_path.replace("http://localhost:3000/uploads/", "");
            db.query(
              "INSERT INTO images2missions (missionID, imageURL) VALUES (?, ?)",
              [missionID, std_path],
              (err, res) => {
                if (err) {
                  throw err;
                }
                // else {
                //   res.send(200).end();
                // }
                // console.log(err);
                // res.error(err);
              }
            );
          }
          // res.send({ res: res });
        } else {
          console.log("No missions found.");
          // res.send({ message: "No pics found." });
        }
      }
    }
  );
  // if (!err)
  res.sendStatus(200).end();
});

app.get("/missionlist", function(req, res) {
  db.query(
    "SELECT username, missionID, imageURL FROM images2missions NATURAL JOIN missions NATURAL JOIN users",
    [],
    function(err, result) {
      // TODO: optimize SQL
      if (err) {
        throw err;
      } else if (res) {
        res.send({ result: result });
      }
    }
  );
});

app.post("/updatemissionlist", function(req, res) {
  const missionID = req.body.missionID;
  const takerID = req.body.takerID;
  console.log("update");
  db.query(
    "UPDATE missions SET takerID = ? WHERE missionID = ?",
    [takerID, missionID],
    function(err, result) {
      if (err) {
        throw err;
      }
    }
  );
});

//get single user's status
app.get("/missionstatus", function(req, res) {
  const userID = req.query.userID;
  // console.log(userID);
  db.query(
    "SELECT missionID, imageURL, mission_status, taker_name FROM ((SELECT mission_status, takerID, missionID, imageURL FROM images2missions NATURAL JOIN missions WHERE userID = ?) AS T LEFT OUTER JOIN (SELECT userID, username AS taker_name FROM users) AS S ON T.takerID = S.userID)",
    // "SELECT * FROM images2missions NATURAL JOIN missions WHERE userID = ?",
    // "SELECT userID, username AS taker_name FROM users",
    [userID],
    function(err, result) {
      // TODO: optimize SQL
      if (err) {
        throw err;
      } else if (res) {
        console.log(result);
        res.send({ result: result });
      }
    }
  );
});

app.get("/singlemission", function(req, res) {
  const missionID = req.query.missionID;
  // console.log(JSON.stringify(missionID));
  db.query(
    "SELECT imageURL, i2mID FROM images2missions WHERE missionID = ?",
    [missionID],
    function(err, result) {
      if (err) {
        res.error(err);
      } else if (res) {
        res.send({ result: result });
      }
    }
  );
});

app.post("/afterlabel", function(req, res) {
  const missionID = req.body.missionID;
  console.log(missionID);
  db.query(
    "UPDATE missions SET mission_status = 'Y' WHERE missionID = ?",
    [missionID],
    function(err, result) {
      if (err) {
        throw err;
      }
    }
  );
});
// app.post("/upload", (req, res) => {
//   const data_url = req.file.path;
//   const userID = req.body.userID;

//   db.query(
//     "INSERT INTO images VALUES (?, ?)",
//     [data_url, userID],
//     (err, result) => {
//       if (err) {
//         res.send({ err: err });
//       }
//     }
//   );
// });

app.listen(3000, () => {
  console.log("running server");
});

// router.listen(3000, () => {
//   console.log("listening");
// });
