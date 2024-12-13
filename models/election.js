import mongoose from 'mongoose';

const electionSchema = new mongoose.Schema({


    title:{
        type:String,
        required: true,
    },

    about:{
        type:String,
    },

    parties:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "party",
    },

});

const electionModel = mongoose.model("election", electionSchema)

export default electionModel