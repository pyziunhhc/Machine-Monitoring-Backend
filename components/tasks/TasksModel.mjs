import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const taskSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    tasks: [{
        id: String,
        name: String,
        done: Boolean,
        edit: Boolean
    }],
    color: {
        type: String,
        required: true,
    },
    userWhoCreated: {
        type: String,
        required: true
    },
    usersWhoPerforms: {
        type: Array,
        required: true
    }

})

const Task = mongoose.model('Task', taskSchema);

export default Task;