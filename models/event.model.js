import mongoose, {Schema} from 'mongoose';

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    max_participants: {
        type: Number,
        default: null
    },
    rsvp_deadline: {
        type: Date,
        required: true
    },
    club_id: {
        type: Schema.Types.ObjectId,
        ref: 'Club',
        required: true
    },
    participants:[{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    
}, {
    timestamps: true
});

export const Event = mongoose.model("Event", eventSchema);