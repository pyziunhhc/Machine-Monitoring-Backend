import DashboardUserSettings from './models/DashboardUserSettings.mjs'
import DashboardSettings from './models/DashboardSettings.mjs'

const getSettings = (req, res, next) => {
    try {
        DashboardSettings.find((error, document) => {
            if (!error) {
                if (document) {
                    res.send({
                        success: true,
                        document
                    })
                }
            }
        })
    } catch (error) {

    }
}

const getUserSettings = (req, res, next) => {
    try {
        const user = req.session.user.login;
        DashboardUserSettings.find({
            user
        }, (error, settings) => {
            if (!error) {
                if (settings) {
                    res.send({
                        success: true,
                        settings: settings.dashboardOptions
                    })
                }
            }
        })
    } catch (error) {
        console.log(`Dashboard settings get error ${error}`)
    }
}

const setUserSettings = (req, res, next) => {
    try {
        const {
            login
        } = req.session.user;
        const {
            settings
        } = req.body;
        const result = DashboardUserSettings.findOne({
            login
        }, (error, document) => {
            if (!error) {
                if (settings) {
                    DashboardUserSettings.findOneAndUpdate({
                        login
                    }, {
                        document
                    })
                }
            }
        }).exec();
        if (result) {
            res.send({
                success: true
            })
        }
    } catch (error) {

    }
}

export default {
    getSettings,
    getUserSettings,
    setUserSettings
}