import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const notificationsSchema = new Schema({
    user: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    read: {
        type: Boolean,
        require: true
    }
})

const Notifications = mongoose.model('Notifications', notificationsSchema);

export default Notifications;