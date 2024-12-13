import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please enter a name"],
    },

    savedPic: {
        public_id: String,
        url: String,
    },

    email:{
        type: String,
        required: [true, "Please enter an email"],
        unique: [true, "Email already exists"],
    },

    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "password must be 6 characters long"],
        select: false,
    },

    aadharNo:{
        type: String,
        unique: [true, "aadhar already exists"],
    },

    electionCode: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "election",
        },
    ],

    // votedParty: [
    //     {
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref: "election",
    //     },
    // ],



});

const userModel = mongoose.model("user", userSchema)

export default userModel