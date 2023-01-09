import { Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../middlewares/auth";

const { Router } = require("express");
const config = require("config");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const router = new Router();
const auth = require("../middlewares/auth");

router.post(
  "/register",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Incorrect password length").isLength({
      min: 3,
      max: 20,
    }),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation error", errors });
      }

      const { email, password } = req.body;
      const duplicate = await User.findOne({ email });

      if (duplicate) {
        return res
          .status(409)
          .json({ message: `User with email ${email} is already exist` });
      }

      const hash = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hash });
      await user.save();
      return res.json({ message: "User created!" });
    } catch (err) {
      console.log(err);
      res.send({ message: "Server error" });
    }
  }
);

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: `User or password incorrect` });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(404).json({ message: `User or password incorrect` });
    }

    const token = jwt.sign({ id: user.id }, config.get("secret"), {
      expiresIn: "1d",
    });
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatarURL: user.avatarURL,
      },
    });
  } catch (err) {
    console.log(err);
    res.send({ message: "Server error" });
  }
});

router.get(
  "/auth",
  auth,
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    try {
      const user = await User.findOne({ _id: req.user.id });

      const token = jwt.sign({ id: user.id }, config.get("secret"), {
        expiresIn: "1d",
      });
      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          diskSpace: user.diskSpace,
          usedSpace: user.usedSpace,
          avatarURL: user.avatarURL,
        },
      });
    } catch (err) {
      console.log(err);
      res.send({ message: "Server error" });
    }
  }
);

module.exports = router;
