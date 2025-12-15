"use strict";

const fs = require("fs/promises");
const { resolve, dirname } = require("path");

const file = process.env.NODE_ENV === "test" ? "data.test.json" : "data.json";

async function saveNotes(notes) {
  const filePath = resolve(__dirname, `../data/${file}`);
  const dir = dirname(filePath);

  await fs.mkdir(dir, { recursive: true });

  await fs.writeFile(filePath, JSON.stringify(notes, null, 2));
}

module.exports = saveNotes;
