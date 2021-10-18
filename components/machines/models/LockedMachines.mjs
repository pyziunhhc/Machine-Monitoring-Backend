import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const lockedMachinesSchema = new Schema({
    login: {
        type: String,
        require: true
    },
    machineName: {
        type: String,
        require: true
    },
    lock: {
        type: Boolean,
        require: true
    }
}, {
    timestamps: true
})

const LockedMachine = mongoose.model('LockedMachine', lockedMachinesSchema);

export default LockedMachine;