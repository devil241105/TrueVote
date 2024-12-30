import mongoose from 'mongoose';

const summarySchema = new mongoose.Schema({
    user: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    ],

    election: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "election",
        },
    ],

    party: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "party",
        },
    ],

})

const summaryModel = mongoose.model("summary", summarySchema)

export default summaryModel;