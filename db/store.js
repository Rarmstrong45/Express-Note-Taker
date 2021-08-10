const fs = require("fs");
const apiRoutes = require("../routes/apiroutes.js")


let dbDataArray = fs.readFile("./db.json");
console.log(dbDataArray);


module.exports = dbDataArray;
