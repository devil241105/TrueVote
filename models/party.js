import mongoose from 'mongoose';

const partySchema= new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },

    about:{
        type:String,
        required: true,
    },

    yearWon:{
        type:String,
        required: true,
    },

    motive:{
        type:String,
        required: true,
    },
});

const partyModel = mongoose.model("party", partySchema)

export default partyModel