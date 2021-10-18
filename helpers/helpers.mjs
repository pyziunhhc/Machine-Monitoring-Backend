import {
    SenderEmail
} from '../components/sender/SenderModel.mjs';
import path from 'path';
import mailer from 'nodemailer'
export const parseMillisecondsIntoReadableTime = (milliseconds) => {
    //Get hours from milliseconds

    let hours = milliseconds / 1000 / 60 / 60,
        absoluteHours = Math.floor(hours),
        h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours,

        //Get remainder from hours and convert to minutes
        minutes = (hours - absoluteHours) * 60,
        absoluteMinutes = Math.floor(minutes),
        m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes,

        //Get remainder from minutes and convert to seconds
        seconds = (minutes - absoluteMinutes) * 60,
        absoluteSeconds = Math.floor(seconds),
        s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;


    return `${h}:${m}:${s}`
};

export const createTransport = async () => {
    const EmailConfiguration = await SenderEmail.find().exec(),
        length = EmailConfiguration.length - 1,
        {
            email,
            password,
            host,
            port
        } = EmailConfiguration[length];

    let transporter = mailer.createTransport({
        host,
        port,
        secure: true,
        auth: {
            user: email,
            pass: password
        }
    })
    return transporter;
}
export const createEmailReportOfMachinePerformance = (type, data, email, user) => {
    const style = `.eroding,.working,.erodowanie {background-color: #005214;color: white;}.grinding,.szlifowanie {background-color: #00d12c;color: white;}.measuring,.pomiar {background-color: #ffb133;color: white;}.manualLoading {background-color: #51b6d7;color: white;}.alarm {background-color: red;color: white;}.suspend {background-color: #911313;color: white;}.robotLoading {background-color: #c800c8;color: white;}.stop {background-color: #ffe928;color: black;}.disconnect {background-color: #919191;color: white;}.wheelReplacement {background-color: black;color: white;}.toolChange {background-color: # ceb777;color: white;}.transition {background-color: #ff70b7;color: white;}.warmup {background-color: #a85050;color: white;}.undefined, .status {background: black;color: white;}table {border-collapse: collapse;}table>thead>tr>th,table>tbody>tr>td {border: 1px solid black;text-align: center;font-size: 1em;font-weight: bold;position: relative;padding: 5px;}.main-report__container{font-family: Roboto}.reports__container{display: flex; align-items:center; justify-content: space-around; margin: 1%;}.informations__container {display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 1.2em;text-align:center;}.informations__container > h3:nth-child(even){font-weight: 300}.report__container{display: flex; flex-direction: column; align-items:center; justify-content: center;margin:1%}.report__container > header {font-size:1.3em;font-weight:bold}`;
    let messageBody = '<div class="main-report__container">';
    for (let i = 0; i < data.length; i++) {
        messageBody += `<div class="reports__container">
                            <div class="informations__container"><h3>${data[i].name}</h3><h3>${data[i].productionType}</h3>
                            </div>
                            `
        for (let j = 0; j < data[i].tables.length; j++) {
            messageBody += `<div class="report__container">${data[i].tables[j]}</div>`
        }
        messageBody += `</div>`
    }
    messageBody += `</div>`;
    const html = `<!DOCTYPE html>
                            <html>
                                <head><style>${style}</style></head>
                                <body>${messageBody}</body>
                                </html>`;
    if (type === "daily") {
        const message = {
            from: `"Monitoring Maszyn - ITA Tools Sp. z o.o "<${email}>`,
            to: [email],
            subject: `Statystyki maszyn z dnia ${new Date(new Date()-86400000).toLocaleDateString()}`,
            html,
            attachments: [{
                filename: `Statystyki maszyn z dnia ${new Date(new Date()-86400000).toLocaleDateString()}.xlsx`,
                path: `${path.resolve()}\\Files\\STATYSTYKI_CODZIENNE_${user}.XLSX`
            }]
        }
        return message;
    } else {
        const month = months.filter(value => {
            if (value.value == new Date().getMonth() - 1) {
                return value.name
            }
        })
        const message = {
            from: `"Monitoring Maszyn - ITA Tools Sp. z o.o "<m.pyz@itatools.pl>`,
            to: [email],
            subject: `Statystyki maszyn z miesiąca ${month[0].name}`,
            html: html,
            attachments: [{
                filename: `Statystyki maszyn z miesiąca ${month[0].name}.xlsx`,
                path: `${path.resolve()}\\Files\\STATYSTYKI_MIESIECZNE_${login}.XLSX`
            }]
        }
        return message;
    }


}