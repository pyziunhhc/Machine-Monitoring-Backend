import Users from '../users/models/UsersModel.mjs'
export const get = async (req, res, next) => {
    res.send({
        success: true
    })
}

export const getUsers = async (req, res, next) => {
    const users = await Users.find().exec();
    console.log(users)
    if (users) {
        res.sed({
            success: true,
            users
        })
    }

}