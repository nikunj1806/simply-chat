import {mongoose, model} from 'mongoose';

const conversationSchema = new mongoose.Schema({
    from_id: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        required: true,
    },
    to_id: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});
const Conversation = model('Conversation', conversationSchema);
export default Conversation;