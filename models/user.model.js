import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    savedPic:{
        public_id: String,
        url: String,
    },
    email: {
        type: String,
        unique: [true, "Email is already in use"],
        required: [true , "Email is required"],
    },
    password: {
        type: String,
        required: [ true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    },
    role: {
        type: String,
        enum: ["Student", "Club Organizer"],
        required: true
    },
    studentNo:{
        type: String,
        unique: [true, "Student Number already exists"],
    },
    club_id: {
        type: Schema.Types.ObjectId,
        ref: 'Club',
        default: null
    },
    participatedEvents: [{
        type: Schema.Types.ObjectId,
        ref: 'Event',
        default: []
    }],
},
{
    timestamps: true
});

export const User = mongoose.model("User", userSchema);