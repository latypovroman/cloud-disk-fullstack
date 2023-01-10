import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");
const config = require("config");

export interface IGetUserAuthInfoRequest extends Request {
  user: { id: string };
}

function auth(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "Authorization error" });
    }

    const token = authorization.split(" ")[1];
    req.user = jwt.verify(token, config.get("secret"));
    next();
  } catch (err) {
    return res.status(401).json({ message: "Authorization error" });
  }
}

export {};
module.exports = auth;
