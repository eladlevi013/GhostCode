import jwt from 'jsonwebtoken';
import connectDB from '../../config/db';
import Account from '../../models/account';

export default async function handler(req, res) {
    console.log(req.headers.authorization);
    const jwtToken = req.headers.authorization.split(' ')[1];

    // Updating finished level on Mongoose
    const { finishedLevel, linesOfcode, stars } = req.body;
    const decodedToken = jwt.verify(jwtToken, process.env.JWT_KEY);
    
    try {
        await connectDB();
        const _account = await Account.findById(decodedToken._account._id);
        // Convert levelNo to a string as it will be used as the key in the levelsData object
        const levelNoString = finishedLevel.toString();
        // Update the specified level data in the levelsData object
        _account.levelsData[levelNoString] = {
            starsData: stars, // You can replace this with your actual data
            lines: linesOfcode,
        };
        // Mark the document as modified and save it
        _account.markModified('levelsData');
        _account.currentLevel = finishedLevel == _account.currentLevel 
            ? finishedLevel + 1 : _account.currentLevel;
        await _account.save();
        res.status(200).json({ message: 'Level data updated' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred' });
    }
}
