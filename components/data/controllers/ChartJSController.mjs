import {
    getStatuses
} from "../../../helpers/fetchFromMainApp.mjs";
import {
    prepareSummaryData,
    prepareDataForChartJS,
    updateDataForChartJS
} from "../../../tasks/processStatuses/process.mjs";
const get = async (req, res, next) => {
    const {
        name
    } = req.params;
    const {
        from,
        to,
        type
    } = req.query;
    const result = await getStatuses(name, from, to);
    if (result) {
        if (result.length) {
            const summaryMachineData = await prepareSummaryData(result, from, to);
            const dataForChartJS = await prepareDataForChartJS(summaryMachineData);
            if (type === "current") {
                req.session.data = {
                    current: {
                        dataForChartJS
                    }
                }
                req.session.save((error) => {
                    if (!error) {
                        res.send({
                            success: true,
                            chartJS: dataForChartJS,
                        })
                    }
                })
            } else {
                res.send({
                    success: true,
                    chartJS: dataForChartJS,
                })
            }

        }
    } else {
        console.log(`Get chartjs error ${result}`)
    }
}

const update = async (req, res, next) => {
    const {
        summary
    } = req.session.data;
    const dataForChartJS = await updateDataForChartJS(summary)
    req.session.data = {
        summary: summary,
        chartJS: dataForChartJS,
    }

    req.session.save((error) => {
        if (!error) {
            res.send({
                success: true,
                chartJS: dataForChartJS,
            })
        } else {
            console.log(`save update chartjs error ${error}`)
        }
    })

}

export default {
    get,
    update
}