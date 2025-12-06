const fs = require("fs/promises");
const { resolve } = require("path");

const isExists = async (path) => {
  try {
    await stat(path);
    return true;
  } catch (e) {
    return false;
  }
};

async function saveData(req, res, next) {
  const filePath = resolve(__dirname, "../data.json");
  const { id } = req.body;

  try {
    const stats = await fs.stat(filePath);

    if (stats.size === 0) {
      await fs.writeFile(filePath, JSON.stringify([req.body]), "utf-8");
    } else {
      const file = await fs.readFile(filePath, "utf-8");
      const data = JSON.parse(file);
      const noteExists = data.find((el) => Number(el.id) === Number(id));

      if (!noteExists) {
        data.push(req.body);
        await fs.writeFile(filePath, JSON.stringify(data), "utf-8");
      }
    }
  } catch (error) {
    throw new Error("Error:" + error.message);
  }

  next();
}

module.exports = saveData;
