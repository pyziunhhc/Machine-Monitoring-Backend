import Users from "./models/UsersModel.mjs";
import Stats from '../statistics/UserStatisticsModel.mjs'
import {
    validationResult
} from 'express-validator'
const get = async (req, res, next) => {
    try {
        const users = await Users.find({}, {
            login: 1,
            email: 1,
            machines: 1,
            name: 1,
            surname: 1,
            role: 1
        }).sort('login').exec();
        if (users) {
            if (users.length) {
                res.send({
                    success: true,
                    users
                })
            }
        }
    } catch (error) {
        console.log(`get users error${error}`)
    }

}

const getCurrentUser = async (req, res, next) => {
    try {
        const {
            login
        } = req.session.user;
        if (login) {
            res.send({
                success: true,
                login
            })
        }
    } catch (error) {
        console.log(`Current user get ${error}`);
    }
}
const updatePassword = async (req, res, next) => {
    const {
        login,
        oldPassword,
        newPassword
    } = req.body;
    const user = await Users.findOne({
        login
    }).exec()
    user.changePassword(oldPassword, newPassword, (error) => {
        if (!error) {
            res.send({
                success: true,
                message: ['Hasło zostało zmienione']
            })
        }
    })
}
const updateEmail = (req, res, next) => {
    const {
        login,
        email
    } = req.body;


    User.findOneAndUpdate({
        login: login
    }, {
        email: email
    }, (err, res) => {
        if (!err) {
            res.send({
                success: true,
                message: ['Adres email został zmieniony']
            })
        }
    })


}
const register = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const {
            login,
            name,
            password,
            rePassword,
            surname,
            email,
            role
        } = req.body;

        if (password === rePassword) {
            const user = new Users({
                login,
                password,
                rePassword,
                email,
                name,
                surname,
                role,
            });
            Users.register(user, password)
                .then(result => {
                    res.send({
                        success: true
                    })
                })
                .catch(error => {
                    console.log('blad', error)
                    switch (error.name) {
                        case 'UserExistsError':
                            res.send({
                                success: false,
                                message: ['Użytkownik po podanym loginie już istnieje']
                            })
                    }
                })
        }
    } else {
        let message = [];
        errors.errors.map(error => {
            message.push(error.msg)
        })
        res.send({
            success: false,
            message
        })
    }

}
const remove = (req, res, next) => {
    const {
        login
    } = req.body;
    const userIsRemoved = Users.findOneAndRemove({
        login
    }).exec()
    const statsIsRemoved = Stats.find({
        user: login
    }, (error, stats) => {
        if (!error) {
            stats.forEach(stat => {
                Stats.findOneAndRemove({
                    _id: stat._id
                })
            })
        }
    })
    if (userIsRemoved && statsIsRemoved) {
        res.send({
            success: true,
            message: [`Usunięto użytkownika ${login}`]
        })
    }
}
export default {
    get,
    getCurrentUser,
    updatePassword,
    updateEmail,
    remove,
    register
}