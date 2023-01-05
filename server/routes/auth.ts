import { Request, Response } from 'express';
const { Router } = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const router = new Router();

router.post("/register",
    [
        check( "email", "Incorrect email").isEmail(),
        check("password", "Incorret password length").isLength({ min: 3, max: 20 })
    ],
    async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation error", errors })
        }

        const { email, password } = req.body;
        const duplicate = await User.findOne({ email });

        if (duplicate) {
            return res.status(409).json({ message: `User with email ${email} is already exist`});
        }

        const hash = await bcrypt.hash(password, 15);
        const user = new User({ email, password: hash });
        await user.save();
        return res.json({ message: "User created!" });

    } catch(err) {
        console.log(err);
    }
})

module.exports = router;