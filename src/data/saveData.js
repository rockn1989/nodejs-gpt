"use strict";

const fs = require("fs/promises");
const { resolve } = require("path");

async function saveData(notes) {
  const filePath = resolve(__dirname, "./data.json");

  try {
    const stats = await fs.stat(filePath);

    if (stats.size === 0) {
      await fs.writeFile(filePath, JSON.stringify(notes), "utf-8");
    } else {
      await fs.writeFile(filePath, JSON.stringify(notes), "utf-8");
    }
  } catch (error) {
    throw new Error("Error:" + error.message);
  }
}

module.exports = saveData;
