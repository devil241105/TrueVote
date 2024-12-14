import mongoose, {Schema} from 'mongoose';

const rsvpSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    event_id: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    status: {
        type: String,
        enum: ["Confirmed", "Cancelled"],
        required: true
    }
}, {
    timestamps: true
});

export const RSVP = mongoose.model("RSVP", rsvpSchema);