import Users from '../../components/users/models/UsersModel.mjs'
import {
    createPerformanceReport
} from '../../components/reports/ReportsController.mjs';
import {
    createDailyXLSX,
    createMonthlyXLSX
} from '../reports/createExcelFiles.mjs';
import {
    createTransport
} from '../../helpers/helpers.mjs';
import {
    createEmailReportOfMachinePerformance
} from '../../helpers/helpers.mjs';
import {
    SenderTime
} from '../../components/sender/SenderModel.mjs';
import scheduler from 'node-schedule'
const sendDailyReport = async () => {
    const users = await Users.find({}, {
        login: 1,
        email: 1,
        machinesAccess: 1
    }).exec();
    const transporter = await createTransport();
    for (let i = 0; i < users.length; i++) {
        const machinesToReport = users[i].machinesAccess.sender.daily,
            login = users[i].login,
            email = users[i].email;
        const {
            messagesArray,
            excelFilesArray
        } = await createPerformanceReport('daily', machinesToReport);
        createDailyXLSX(excelFilesArray);
        const message = createEmailReportOfMachinePerformance('daily', messagesArray, email, login)
        transporter.sendMail(message);
        return true;
    }
}

const sendMonthlyReport = async () => {
    const users = await Users.find({}, {
        login: 1,
        email: 1,
        machinesAccess: 1
    }).exec();
    const transporter = await createTransport();
    for (let i = 0; i < users.length; i++) {
        const machinesToReport = users[i].machinesAccess.sender.monthly,
            login = users[i].login,
            email = users[i].email;
        const {
            messagesArray,
            excelFilesArray
        } = await createPerformanceReport('monthly', machinesToReport);
        createMonthlyXLSX(excelFilesArray);
        const message = createEmailReportOfMachinePerformance('monthly', messagesArray, email, login)
        transporter.sendMail(message);
        return true;
    }
}


export const runReportMailer = async () => {
    const time = await SenderTime.find().exec(),
        {
            daily,
            monthly
        } = time[0],
        dailyTimeHour = daily.time.split(':')[0],
        dailyTimeMinute = daily.time.split(':')[1],
        monthlyTimeHour = monthly.time.split(':')[0],
        monthlyTimeMinute = monthly.time.split(':')[1];

    scheduler.scheduleJob(`0 ${dailyTimeMinute} ${dailyTimeHour} * * *`, async () => {
        sendDailyReport();
        //TODO: log z wysłaniem wiadomości/nie wysłaniem wiadomości
    })
    // scheduler.scheduleJob(`0 0 8 ${months[new Date().getMonth()].to} ${new Date().getMonth()} *`, () => {

    // })
}