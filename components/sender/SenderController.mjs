import path from 'path'
import {
    Sender,
    SenderTime,
    SenderEmail
} from "./SenderModel.mjs";
import Users from "../users/models/UsersModel.mjs";
import {
    createDailyXLSX,
    createMonthlyXLSX
} from "../../tasks/reports/createExcelFiles.mjs";
import {
    months
} from "../../helpers/dictionaries.mjs";
import {
    createPerformanceReport
} from "../reports/ReportsController.mjs";
import {
    createEmailReportOfMachinePerformance
} from '../../helpers/helpers.mjs'
import {
    createTransport
} from '../../helpers/helpers.mjs';
export const getAccessedUsersToMachines = async (req, res, next) => {
    try {
        const users = await Users.find({}, {
            login: 1,
            machinesAccess: 1
        }).exec();
        res.send({
            success: true,
            users
        })

    } catch (error) {

    }
}
export const getMachinesByUser = async (req, res, next) => {
    try {
        const {
            machineName,
            senderType
        } = req.params;
        const machine = await Sender.findOne({
            machineName,
            senderType
        }).exec();
        const users = await Users.find().exec();
        if (machine && users) {
            let availableUsers = []
            for (let i = 0, length = users.length; i < length; i++) {
                const index = machine.users.indexOf(users[i].login)
                if (index === -1) {
                    availableUsers.push(users[i].login)
                }
            }
            res.send({
                success: true,
                authorizedUsers: machine.users,
                availableUsers
            })
        } else {
            let availableUsers = []
            for (let i = 0, length = users.length; i < length; i++) {
                availableUsers.push(users[i].login)
            }
            res.send({
                success: true,
                authorizedUsers: [],
                availableUsers
            })
        }
    } catch (error) {
        console.log(`Get sender ${error}`)
    }
}
export const updateMachinesByUser = async (req, res, next) => {
    try {
        const {
            machineName,
            senderType
        } = req.params, {
            login
        } = req.body;

        const machines = await Sender.findOne({
            machineName,
            senderType
        }).exec();
        const user = await Users.findOne({
            login
        }).exec();
        console.log(machines, user)
        if (machines) {
            machines.users.push(login)
            user.machinesAccess.sender[senderType].push(machineName)
            await machines.save();
            await user.save();
            res.send({
                success: true
            })
        } else {
            console.log('dopdaj')
            const machine = new Sender({
                machineName,
                senderType,
                users: [login]
            })
            machine.save((error) => {
                console.log(error)
                res.send({
                    success: true
                })
            })
        }
    } catch (error) {
        console.log(`update machines ${error}`)
    }
}
export const deleteMachinesByUser = async (req, res, next) => {
    try {
        const {
            machineName,
            login,
            senderType,
        } = req.params;


        const machines = await Sender.findOne({
            machineName,
            senderType
        }).exec();
        const user = await Users.findOne({
            login
        }).exec();
        if (machines && user) {
            console.log(machines, user)
            const filteredUsers = machines.users.filter((user) => user !== login)
            machines.users = filteredUsers;
            const filteredMachines = user.machinesAccess.sender[senderType].filter(machine => machine !== machineName)
            user.machinesAccess.sender[senderType] = filteredMachines;

            machines.save()
            user.save();
            res.send({
                success: true
            })
        }
    } catch (error) {
        console.log(`update machines ${error}`)
    }
}
export const getSenderTime = async (req, res, next) => {
    const senderTime = await SenderTime.findOne().exec();
    if (senderTime) {
        res.send({
            success: true,
            daily: senderTime.daily,
            monthly: senderTime.monthly
        })
    }
}
export const setSenderTime = async (req, res, next) => {
    const {
        dailyTime,
        monthlyTime
    } = req.body;
    const isExist = await SenderTime.findOne().exec();
    if (!isExist) {
        const senderTime = new SenderTime({
            daily: {
                time: dailyTime
            },
            monthly: {
                time: monthlyTime
            }
        })

        senderTime.save((error) => {
            if (!error) {
                res.send({
                    success: true
                })
            }
        })
    } else {
        isExist.daily.time = dailyTime;
        isExist.monthly.time = monthlyTime;
        isExist.save((error) => {
            if (!error) {
                res.send({
                    success: true
                })
            }
        })
    }

}
export const setEmailAccount = async (req, res, next) => {
    const {
        email,
        password,
        host,
        port
    } = req.body;

    const senderEmail = new SenderEmail({
        email,
        password,
        host,
        port
    })
    senderEmail.save((error) => {
        if (!error) {
            res.send({
                success: true
            })
        }
    })


}
export const sendPerformanceReport = async (req, res, next) => {
    const {
        senderType
    } = req.params;
    const {
        login
    } = req.body;

    const {
        machinesAccess: {
            sender
        },
        email
    } = await Users.findOne({
        login
    }).exec();
    const machines = sender[senderType];
    const {
        messagesArray,
        excelFilesArray
    } = await createPerformanceReport(senderType, machines);
    const transporter = await createTransport();
    console.log(transporter)
    senderType === 'daily' ? createDailyXLSX(excelFilesArray, login) : createMonthlyXLSX(excelFilesArray, login)
    const message = createEmailReportOfMachinePerformance(senderType, messagesArray, email, login);
    await transporter.sendMail(message);
}