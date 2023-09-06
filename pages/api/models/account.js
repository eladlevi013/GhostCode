import mongoose from "mongoose";
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    email: String,
    username: String,
    password: String,
    role: String,
    world: Number,
    currentLevel: { type: Number, default: 1 },
    levelsData: {
        type: Object,
        default: {},
    },
});

module.exports = mongoose.models.Account 
    || mongoose.model('Account', accountSchema);
