import LoggedUser from '../../components/users/models/LoggedUsersModel.mjs';
import schedule from 'node-schedule';

function removeLoggedUsers(req, res, next) {
    let rule = new schedule.RecurrenceRule();
    rule.hour = 1;
    LoggedUser.find((error, loggedUsers) => {
        if (loggedUsers) {
            loggedUsers.forEach(user => {
                const loggedAt = new Date(user.loggedAt).getTime(),
                    logout = new Date(loggedAt + 3600000);
                // if (logout.getTime() < new Date().getTime()) {
                LoggedUser.findOneAndDelete({
                    _id: user._id
                }).exec();

                // } else {
                //     schedule.scheduleJob(logout, () => {
                //         LoggedUser.findOneAndDelete({
                //             _id: user._id
                //         }, (error, document) => {

                //         })
                //     })
                // }
            })
        }
    })

    schedule.scheduleJob(rule, () => {
        LoggedUser.find((error, loggedUsers) => {
            if (loggedUsers) {
                loggedUsers.forEach(user => {
                    const loggedAt = new Date(user.loggedAt).getTime(),
                        logout = new Date(loggedAt + 3600000);

                    if (logout > new Date()) {
                        schedule.scheduleJob(new Date(), () => {
                            LoggedUser.findOneAndDelete({
                                _id: user._id
                            }, (error, document) => {

                            })
                        })
                    } else {
                        schedule.scheduleJob(logout, () => {
                            LoggedUser.findOneAndDelete({
                                _id: user._id
                            }, (error, document) => {

                            })
                        })
                    }
                })
            }
        })
    })
}

export default removeLoggedUsers