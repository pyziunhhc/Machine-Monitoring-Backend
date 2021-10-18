import LoggedUser from '../users/models/LoggedUsersModel.mjs'
import UserStatistics from '../statistics/UserStatisticsModel.mjs';
import LockedMachines from '../machines/models/LockedMachines.mjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
mongoose
    .connect("mongodb://localhost:27017/monitoring", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then()
    .catch((error) => console.log(error));
mongoose.connection.on("connected", () => {
    console.log("Connected to database");
});

export const check = async (req, res, next) => {
    const {
        login
    } = req.user;
    if (login) {
        const isUserInDatabase = await LoggedUser.findOne({
            login
        }).exec();
        if (isUserInDatabase) {
            const token = jwt.sign({
                id: req.user._id
            }, 'sekret', {
                expiresIn: 1200
            });
            console.log(token)
            res.send({
                success: true,
                user: login
            })
        } else {
            res.send({
                success: false
            })
        }
    } else {
        res.status(403).send({
            success: false
        })
    }


}
export const login = async (req, res) => {

    const token = jwt.sign({
        id: req.user._id
    }, 'sekret', {
        expiresIn: 1200
    });
    const login = req.user.login,
        userID = req.user._id,
        role = req.user.role;
    const loggedUser = new LoggedUser({
        login,
        userID,
        token
    });
    const result = await loggedUser.save();
    if (result) {
        req.session.user = {
            login,
            role
        }
        req.session.data = {
            current: []
        }
        req.session.save(() => {
            res.send({
                success: true,
                login,
                token
            })
        })
    }

}
export const logout = async (req, res, next) => {
    try {
        const {
            login
        } = req.user;

        LockedMachines.findOneAndDelete({
            user: login
        }, (err, document) => {
            if (err) {
                console.log(`Błąd ${err}`)
            } else if (document) {
                UserStatistics.findOneAndUpdate({
                    user: login,
                    lockedStats: false
                }, {
                    lockedStats: true,
                    end: new Date()
                }, (err, document) => {
                    if (document) {
                        removeLoggedUser(login, res, req, next)
                        next()
                    } else {
                        removeLoggedUser(login, res, req, next);
                    }
                })
            } else {
                removeLoggedUser(login, res, req, next)
            }
        })

    } catch (error) {
        throw new Error(error)
    }
}
export const destroy = (req, res, next) => {
    try {
        req.session.destroy(error => {
            if (!error) {
                res.send({
                    success: true
                })
            }
        })

    } catch (error) {

    }
}


const removeLoggedUser = (user, res, req, next) => {
    LoggedUser.findOneAndDelete({
        login: user
    }, (err, document) => {
        if (document) {
            req.session.destroy(error => {
                if (!error) {
                    req.user = null;
                    res.send({
                        success: true
                    })
                }
            })

        } else {
            next()
        }
    })
}