const User = require("../models/user");

exports.read = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      user.hashed_password = undefined;
      user.salt = undefined;
      return res.json(user);
    })
    .catch((err) => {
      return res.status(400).json({ error: "User not found" });
    });
};
