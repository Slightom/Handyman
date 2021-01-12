/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const mockData = require("./mockData");

const { seniors, formStatuses, handymans, forms } = mockData;
const data = JSON.stringify({ seniors, formStatuses, handymans, forms });
const filepath = path.join(__dirname, "db.json");

fs.writeFile(filepath, data, function (err) {
  err ? console.log(err) : console.log("Mock DB created.");
});