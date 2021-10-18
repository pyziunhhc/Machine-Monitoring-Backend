import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const SenderSchema = new Schema({
    machineName: {
        type: String,
        required: true,
    },
    senderType: {
        type: String,
        required: true
    },
    users: {
        type: Array
    }
})
const SenderTimeSchema = new Schema({
    daily: {
        time: {
            type: String
        }
    },
    monthly: {
        time: {
            type: String
        }
    },
})
const SenderEmailSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    host: {
        type: String,
        required: true
    },
    port: {
        type: Number,
        required: true
    }
})
export const Sender = mongoose.model('Sender', SenderSchema)
export const SenderTime = mongoose.model('SenderTime', SenderTimeSchema)
export const SenderEmail = mongoose.model('SenderEmail', SenderEmailSchema)