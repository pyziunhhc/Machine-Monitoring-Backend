import {
    getStatuses
} from "../../helpers/fetchFromMainApp.mjs";
import {
    prepareSummaryData
} from "../../tasks/processStatuses/process.mjs";
import {
    parseMillisecondsIntoReadableTime
} from '../../helpers/helpers.mjs';
import {
    months
} from '../../helpers/dictionaries.mjs'
export const createPerformanceReport = async (senderType, machines) => {
    if (senderType === 'daily') {
        const now = new Date(),
            day = now.getDate() - 1,
            month = now.getMonth(),
            year = now.getFullYear();
        let messagesArray = [],
            excelFilesArray = [];
        for (let i = 0; i < machines.length; i++) {
            const firstChangeData = await getStatuses(machines[i], new Date(year, month, day, 7, 0, 0), new Date(year, month, day, 15, 0, 0));
            const secondChangeData = await getStatuses(machines[i], new Date(year, month, day, 15, 0, 0), new Date(year, month, day, 23, 0, 0));
            const thirdChangeData = await getStatuses(machines[i], new Date(year, month, day, 23, 0, 0), new Date(year, month, day + 1, 7, 0, 0));
            if (firstChangeData && secondChangeData && thirdChangeData) {
                const firstChangePreparedData = await prepareSummaryData(firstChangeData, new Date(year, month, day, 7, 0, 0), new Date(year, month, day, 15, 0, 0));
                const secondChangePreparedData = await prepareSummaryData(secondChangeData, new Date(year, month, day, 15, 0, 0), new Date(year, month, day, 23, 0, 0));
                const thirdChangePreparedData = await prepareSummaryData(thirdChangeData, new Date(year, month, day, 23, 0, 0), new Date(year, month, day + 1, 7, 0, 0));
                const firstChangeTable = createTable('I ZMIANA', firstChangePreparedData, senderType)
                const secondChangeTable = createTable('II ZMIANA', secondChangePreparedData, senderType)
                const thirdChangeTable = createTable('III ZMIANA', thirdChangePreparedData, senderType)
                messagesArray.push({
                    name: machines[i],
                    tables: [firstChangeTable, secondChangeTable, thirdChangeTable]

                })
                excelFilesArray.push({
                    name: machines[i],
                    data: [firstChangePreparedData, secondChangePreparedData, thirdChangePreparedData]
                })
            }
        }
        return {
            messagesArray,
            excelFilesArray
        }

    } else {
        const now = new Date(),
            month = now.getMonth() - 1,
            year = now.getFullYear();
        let messagesArray = [],
            excelFilesArray = [];
        for (let i = 0; i < months.length; i++) {
            if (months[i].value === month) {
                for (let i = 0; i < machines.length; i++) {
                    const data = await getStatuses(machines[i], new Date(year, month, 1, 0, 0, 0, 0), new Date(year, month, months[i].to, 23, 59, 59, 59));
                    if (data) {
                        const preparedData = await prepareSummaryData(data, new Date(year, month, 1, 0, 0, 0, 0), new Date(year, month, months[i].to, 23, 59, 59, 59));
                        const table = createTable('', preparedData, senderType);
                        messagesArray.push({
                            name: machines[i],
                            tables: [table]
                        })
                        excelFilesArray.push({
                            name: machines[i],
                            data: preparedData
                        })
                    }
                }

            }
        }
        return {
            messagesArray,
            excelFilesArray
        }
    }
}

const createTable = (header, data, type) => {
    try {
        if (type === 'daily') {
            let table = `<header>${header}</header><table><thead><tr class="status"><th>Status</th><th>Czas</th><th>%</th></tr></thead><tbody>`;
            Object.values(data)
                .forEach(value => {
                    if (value.data.time) {
                        const status = value.options.displayName,
                            time = parseMillisecondsIntoReadableTime(value.data.time),
                            percentage = ((value.data.time / data.sumOfTimes.data.time) * 100).toFixed(2);
                        table += `<tr class=${value.options.className}><td>${status}</td><td>${time}</td><td>${percentage}%</td></tr>`
                    }

                })
            table += `</tbody></table>`;

            return table
        } else if (type === 'monthly') {
            let table = `<header>${header}</header><table><thead><tr class="status"><th>Status</th><th>Czas</th><th>Średni czas/doba</th><th>%</th></tr></thead><tbody>`;
            Object.values(data)
                .forEach(value => {
                    if (value.data.time) {
                        months.forEach(month => {
                            const now = new Date().getMonth() - 1;
                            if (month.value === now) {
                                const status = value.options.displayName,
                                    time = parseMillisecondsIntoReadableTime(value.data.time),
                                    averageDailyTime = parseMillisecondsIntoReadableTime(value.data.time / month.to),
                                    percentage = ((value.data.time / data.sumOfTimes.data.time) * 100).toFixed(2);
                                table += `<tr class=${value.options.className}><td>${status}</td><td>${time}</td><td>${averageDailyTime}</td><td>${percentage}%</td></tr>`
                            }
                        })

                    }

                })
            table += `</tbody></table>`;

            return table
        }

    } catch (error) {
        console.log(error)
    }

}