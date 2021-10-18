import mongoose from 'mongoose'
const Schema = mongoose.Schema;


const userStatsSchema = new Schema({
    user: {
        type: String,
        require: true
    },
    machine: {
        type: String,
        require: true
    },
    data: {
        type: Object,
        require: true
    },
    locked: {
        type: Boolean,
        require: true
    }

}, {
    timestamps: true
})

const UserStatistics = mongoose.model('Stats', userStatsSchema);

export default UserStatistics;