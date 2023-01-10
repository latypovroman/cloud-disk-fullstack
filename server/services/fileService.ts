const fs = require("fs");
const config = require("config");

class FileService {
  createDirectory(file: { user: string; path: string }) {
    const filePath = `${config.get("filePath")}\\${file.user}\\${file.path}`;
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath, { recursive: true });
          return resolve({ message: "File successfully created" });
        } else {
          return resolve({ message: "File already exists" });
        }
      } catch (err) {
        return reject({ message: `Error on creating directory ${err}` });
      }
    });
  }
}

export {};
module.exports = new FileService();
