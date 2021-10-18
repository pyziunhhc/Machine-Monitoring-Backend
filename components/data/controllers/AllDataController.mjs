import {
    statusesDictionary
} from "../../../helpers/dictionaries.mjs";

import {
    getStatuses
} from "../../../helpers/fetchFromMainApp.mjs";
import {
    prepareSummaryData,
    prepareDataForDygraph,
    prepareDataForChartJS,
    updateDataForDygraph,
    updateSummaryData,
    updateDataForChartJS
} from "../../../tasks/processStatuses/process.mjs";

const get = async (req, res, next) => {
    const {
        name,
    } = req.params;
    const {
        from,
        to,
        type
    } = req.query;
    // const result = await getStatusesWithPotentiometr(machineName, from, to);
    const result = await getStatuses(name, from, to);
    const lastStatusName = result[result.length - 1].value;
    const summaryMachineData = await prepareSummaryData(result, from, to);
    const dataForDygraph = await prepareDataForDygraph(result);
    const dataForChartJS = await prepareDataForChartJS(summaryMachineData);
    const currentStatus = statusesDictionary.filter(({
        statusName,
        displayName
    }) => statusName === `${lastStatusName}` ? displayName : null)
    if (type === 'current-change') {
        req.session.data.current.push({
            name,
            summary: summaryMachineData,
            dygraph: dataForDygraph,
            chartJS: dataForChartJS,
            status: currentStatus.length ? currentStatus[0].displayName : "WYŁĄCZONA"
        })
        req.session.save((error) => {
            if (!error) {
                res.send({
                    success: true,
                    summary: summaryMachineData,
                    dygraph: dataForDygraph,
                    chartJS: dataForChartJS,
                    status: currentStatus
                })
            }
        })
    }

}
const update = async (req, res, next) => {
    if (req.session.data.current) {
        const {
            name,
            from,
        } = req.body;
        let index = null;
        for (let i = 0; i < req.session.data.current.length; i++) {
            const machineName = req.session.data.current[i].name;
            if (machineName === name) {
                index = i;
                const {
                    summary,
                    dygraph,
                    status
                } = req.session.data.current[i];
                const result = await getStatuses(name, from);
                const currentMachineStatus = result[0].value == null ? 'DISCONNECT' : result[0].value;
                const dataForDygraph = await updateDataForDygraph(result, dygraph, currentMachineStatus, status),
                    summaryMachineData = await updateSummaryData(result, summary, currentMachineStatus, status),
                    dataForChartJS = await updateDataForChartJS(summaryMachineData),
                    currentStatus = summaryMachineData[currentMachineStatus.toLowerCase()].options.displayName.toUpperCase();
                const newData = req.session.data.current.map(data => {
                    if (data.name === name) {
                        data.summary = summaryMachineData;
                        data.dygraph = dataForDygraph;
                        data.chartJS = dataForChartJS;
                        data.status = currentMachineStatus;
                    }
                    return data
                })
                req.session.data.current = newData;
                req.session.save()

            }
        }
        res.send({
            success: true,
            summary: req.session.data.current[index].summary,
            dygraph: req.session.data.current[index].dygraph,
            chartJS: req.session.data.current[index].chartJS,
            status: req.session.data.current[index].status
        })
    } else {
        req.session.data.current = [];
        req.session.save(() => {
            next()
        })

    }


}
export const clearDataInSession = (req, res, next) => {
    const {
        name
    } = req.body;
    const updatedData = req.session.data.current.filter(data => data.name !== name)
    req.session.data.current = updatedData;

    req.session.save((error) => {
        if (!error) {
            res.send({
                success: true
            })
        }
    })
}
export default {
    get,
    update,
    clearDataInSession
}