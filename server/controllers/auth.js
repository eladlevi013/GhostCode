const User = require("../models/user");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "30d", // 1 Month
  });
};

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const newUser = new User({
      username,
      email,
      password,
      role: "user",
      levelsData: [],
      badgeIndex: 0,
    });
    await newUser.save();

    const token = generateToken(newUser);
    return res.json({
      token,
      message: "Signup success",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        badgeIndex: newUser.badgeIndex,
      },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found. Please sign up." });
    }

    const isPasswordValid = await user.authenticate(password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = generateToken(user);
    const { _id, username, role, levelsData } = user;

    return res.json({
      token,
      user: {
        _id,
        username,
        email,
        role,
        badgeIndex: Object.keys(levelsData).length / 5,
      },
      message: "Signin success",
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.isAuth = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
