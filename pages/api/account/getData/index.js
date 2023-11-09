import jwt from "jsonwebtoken";
import connectDB from "../../config/db";
import Account from "../../models/account";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  // Get the token from the Authorization header
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    // Verify and decode the token
    const account = jwt.verify(token, process.env.JWT_KEY);
    const userId = account._id;

    // Connect to the database
    await connectDB();

    // Fetch account data based on the user's ID
    let accountData = await Account.findById(userId);
    accountData = {
      _id: accountData._id,
      email: accountData.email,
      username: accountData.username,
      levelsData: accountData.levelsData,
      currentLevel: accountData.currentLevel,
    };

    if (!accountData) {
      return res.status(404).json({ message: "Account data not found" });
    }

    return res.status(200).json(accountData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
