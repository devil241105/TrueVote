import mongoose, {Schema} from 'mongoose';

const clubSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    memberId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    logo: {
        type: String,
        default: null
    },
    eventId:{
        type: Schema.Types.ObjectId,
        ref: 'Event',
        default: null
    }
}, {
    timestamps: true
});

export const Club = mongoose.model("Club", clubSchema);