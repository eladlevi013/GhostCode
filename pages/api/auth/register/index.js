import connectDB from "../../config/db.js";
import Account from "../../models/account.js";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

export default async function handler(req, res) {
  try {
    await connectDB();

    // validate input
    await body("email")
      .isEmail()
      .withMessage("Please provide a valid email address.")
      .normalizeEmail()
      .run(req);

    await body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long.")
      .trim()
      .run(req);

    await body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long.")
      .trim()
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { email, password, username } = req.body;

    const existingAccount = await Account.findOne({ email });
    if (existingAccount) {
      return res.status(200).json({ message: "Account not available" });
    }

    const id = new mongoose.Types.ObjectId();
    const hash = await bcryptjs.hash(password, 10);
    const newAccount = new Account({
      _id: id,
      email: email,
      username: username,
      password: hash,
      role: "regular",
      levelsData: {},
      currentLevel: 1,
    });

    const accountCreated = await newAccount.save();

    // Create token
    const token = jwt.sign(
      { _id: accountCreated._id, role: accountCreated.role },
      process.env.JWT_KEY,
      {
        expiresIn: "30d",
      }
    );

    return res.status(200).json({
      message: "Account created",
      data: accountCreated,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
}
