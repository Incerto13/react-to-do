/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const mockData = require("./mockData");

// each of these objects below will be an endpoint of the Api
const { tasks, categories, checklists } = mockData;

// if you don't stringify it, it will not appear in Api
const data = JSON.stringify({ tasks, categories, checklists });

const filepath = path.join(__dirname, "db.json");

fs.writeFile(filepath, data, function(err) {
  err ? console.log(err) : console.log("Mock DB created.");
});
