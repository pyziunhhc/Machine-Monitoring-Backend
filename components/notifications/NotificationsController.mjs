import Message from './NotificationsModel.mjs';
import Notifications from './NotificationsModel.mjs';

export const get = (req, res, next) => {
    const user = req.cookies.login;
    Notifications.find({
        user
    }, (error, document) => {
        if (error) {}
        if (document) {
            const nonReadedNotification = [];
            if (document.length) {
                document.forEach((notification, index) => {
                    if (!notification.read) {
                        nonReadedNotification.push(notification)
                        if (index == document.length - 1) {
                            res.send({
                                status: 200,
                                notifications: nonReadedNotification,
                                user: user
                            })
                        }

                    }
                })
            } else {
                res.send({
                    status: 200,
                    user: user
                })
            }
        }
    })
}
export const update = (req, res, next) => {
    const {
        _id,
        read
    } = req.body;

    Notifications.findOneAndUpdate({
        _id
    }, {
        read
    }, (error, document) => {
        console.log(error, document)
        res.send({
            success: true
        })
    })
}
export default {}