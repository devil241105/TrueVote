import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    total_points: {
        type: Number,
        default: 0
    },
    ranking: {
        type: Number,
        default: 0 // This will be calculated dynamically based on points
    }
}, {
    timestamps: true
});

export const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);