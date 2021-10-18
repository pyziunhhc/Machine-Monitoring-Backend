import mongoose from 'mongoose'
const Schema = mongoose.Schema;


const dashboardUserSettingsSchema = new Schema({
    login: {
        type: String,
        require: true
    },
    dashboardOptions: {
        type: Array,
        required: true
    }
}, {
    timestamps: true
})

const DashboardUserSettings = mongoose.model('DashboardUserSettings', dashboardUserSettingsSchema);

export default DashboardUserSettings;