const fileService = require("../services/FileService");
import { Response } from "express";
import { IGetUserAuthInfoRequest } from "../middlewares/auth";

const File = require("../models/File");

class FileController {
  async createDirectory(req: IGetUserAuthInfoRequest, res: Response) {
    try {
      const { name, type, parent } = req.body;
      const file = new File({ name, type, parent, user: req.user.id });
      const parentFile = await File.findOne({ _id: parent });

      if (!parentFile) {
        file.path = name;
        await fileService.createDirectory(file);
      } else {
        file.path = `${parentFile.path}]\\${name}`;
        await fileService.createDirectory(file);
        parentFile.children.push(file._id);
        await parentFile.save();
      }

      await file.save();
      return res.json(file);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  }

  async getFiles(req: IGetUserAuthInfoRequest, res: Response) {
    try {
      const files = await File.find({
        user: req.user.id,
        parent: req.query.parent,
      });
      return res.json({ files });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Server error, cannot get files" });
    }
  }
}

export {};
module.exports = new FileController();
