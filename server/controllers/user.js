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
      user.__v = undefined;

      if (Array.isArray(user.levelsData) && user.levelsData.length > 0) {
        user.badgeIndex = Object.keys(user.levelsData).length / 5 + "";
      } else {
        user.badgeIndex = "0";
      }

      user.levelsData = undefined;
      return res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        badgeIndex: user.badgeIndex,
        role: user.role,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ error: "User not found" });
    });
};

exports.readLevels = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      return res.json(user.levelsData);
    })
    .catch((err) => {
      return res.status(400).json({ error: "User not found" });
    });
};

exports.writeLevel = async (req, res) => {
  const { finishedLevel, linesOfcode, stars } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Clone the existing levelsData
    const updatedLevelsData = { ...user.levelsData };

    // Update the cloned object
    updatedLevelsData[`level${finishedLevel}`] = {
      lines: linesOfcode,
      starsData: stars,
    };

    // Set the updated levelsData and mark as modified
    user.set("levelsData", updatedLevelsData);
    user.markModified("levelsData");

    // Save the updated user
    await user.save();

    return res.json({ message: "Level saved" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error saving level data" });
  }
};
