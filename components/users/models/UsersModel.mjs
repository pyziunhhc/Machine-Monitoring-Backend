import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
const Schema = mongoose.Schema;
const userSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    role: {
        type: String,
        require: true
    },
    machinesAccess: {
        view: {
            type: Array
        },
        sender: {
            daily: {
                type: Array
            },
            monthly: {
                type: Array
            }
        }
    }
}, {
    timestamps: true
})
userSchema.plugin(passportLocalMongoose, {
    usernameField: 'login'
})
const Users = mongoose.model('Users', userSchema)

export default Users;