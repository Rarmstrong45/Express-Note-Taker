const path = require("path");
const fs = require("fs");
const util = require("util");

module.exports = function (app) {

  app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/../db/db.json", function (err, data) {
      if (err) console.log(err);
      res.send(JSON.parse(data));
    });
  });

  app.post("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/../db/db.json", function (err, data) {
      if (err) console.log(err);
      let array = JSON.parse(data);
      array.push(req.body);
      for (let i = 0; i < array.length; i++) {
        array[i].id = i;
      }
      fs.writeFile(
        __dirname + "/../db/db.json",
        JSON.stringify(array),
        function (err, data) {
          if (err) {
            console.log(err);
          } else {
            res.send(array);
          }
        }
      );
    });
  });

  app.delete("/api/notes/:id", function (req, res) {
    fs.readFile(__dirname + "/../db/db.json", function (err, data) {
      if (err) console.log(err);
      let array = JSON.parse(data);
      const newArray = array.filter(
        (dataItem) => dataItem.id !== parseInt(req.params.id)
      );
      fs.writeFile(
        __dirname + "/../db/db.json",
        JSON.stringify(newArray),
        function (err, data) {
          if (err) {
            console.log(err);
          } else {
            res.send(array);
          }
        }
      );
    });
  });
};


