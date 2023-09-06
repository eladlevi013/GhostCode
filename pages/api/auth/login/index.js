import connectDB from '../../config/db.js';
var Account = require('../../models/account.js');
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

export default async function handler(req, res) {
    try {
        await connectDB();

        // Input validation
        await body('email')
            .isEmail().withMessage('Please provide a valid email address.')
            .normalizeEmail()
            .run(req);

        await body('password')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
            .trim()
            .run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }

        // crenetials validation
        const { email, password } = req.body;
        const account = await Account.findOne({ email });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        const isMatch = await bcryptjs.compare(password, account.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // generate token and send response
        const _account = account;
        const token = await jwt.sign({_account}, process.env.JWT_KEY, {expiresIn: '30d'});
        return res.status(200).json({
            message: 'Logged in successfully',
            token: token
        });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred' });
    }
}
