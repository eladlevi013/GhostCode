import jwt from 'jsonwebtoken';
import connectDB from '../../config/db';
import Account from '../../models/account';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method not allowed
  }

  // Get the token from the Authorization header
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.decode(token);

    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const userId = decoded._account._id;

    // Fetch account data based on the user's ID
    await connectDB();
    const accountData = await Account.findById(userId);

    if (!accountData) {
      return res.status(404).json({ message: 'Account data not found' });
    }

    res.status(200).json(accountData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
