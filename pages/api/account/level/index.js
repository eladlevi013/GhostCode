import jwt from "jsonwebtoken";
import connectDB from "../../config/db";
import Account from "../../models/account";

export default async function handler(req, res) {
  const jwtToken = req.headers.authorization.split(" ")[1];

  // Updating finished level on Mongoose
  const { finishedLevel, linesOfcode, stars } = req.body;
  const decodedToken = jwt.verify(jwtToken, process.env.JWT_KEY);

  try {
    await connectDB();
    const _account = await Account.findById(decodedToken._account._id);
    const levelNoString = finishedLevel.toString();
    _account.levelsData[levelNoString] = {
      starsData: stars,
      lines: linesOfcode,
    };

    _account.markModified("levelsData");
    _account.currentLevel =
      finishedLevel == _account.currentLevel
        ? finishedLevel + 1
        : _account.currentLevel;
    await _account.save();
    res.status(200).json({ message: "Level data updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
}
