const fs = require("fs");
const path = require("path");

const file = process.env.NODE_ENV === "test" ? "data.test.json" : "data.json";

const filePath = path.join(__dirname, `../data/${file}`);

const loadNotes = async () => {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

module.exports = loadNotes;
