import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const dashboardSettingsSchema = new Schema({
    dashboardOptions: {
        type: Array,
        required: true
    }
}, {
    timestamps: true
})

const DashboardSettings = mongoose.model('DashboardSettings', dashboardSettingsSchema);

export default DashboardSettings;