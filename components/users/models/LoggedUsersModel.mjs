import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const loggedUserSchema = new Schema({
    login: {
        type: String,
        require: true
    },
    userID: {
        type: String,
        require: true
    },
    token: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

const LoggedUser = mongoose.model('LoggedUser', loggedUserSchema);

export default LoggedUser