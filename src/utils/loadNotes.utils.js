const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/data.json");

const loadNotes = async () => {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

module.exports = loadNotes;
