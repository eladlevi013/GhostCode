import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";

const connectDB = async () => {
    dotenv.config();
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(chalk.cyan.underline
            (`MongoDB connected: ${conn.connection.host}`));
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;
