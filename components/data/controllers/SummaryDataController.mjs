import {
    getStatuses
} from '../../../helpers/fetchFromMainApp.mjs'
import {
    updateSummaryData
} from "../../../tasks/processStatuses/process.mjs"
const get = async (req, res, next) => {
    try {
        const {
            name,
            from,
            to
        } = req.params;
        const response = await getStatuses(name, from, to);
        if (response.status === 200) {
            const result = await response.json();
            res.send({
                success: true
            })
        }
    } catch (error) {

    }
}
const update = async (req, res, next) => {
    try {
        const {
            machineName,
            from
        } = req.body;
        const {
            summary,
            status
        } = req.session.data;
        const result = await getStatuses(machineName, from);
        if (result) {
            const currentMachineStatus = result[0].value;
            const updated = await updateSummaryData(result, summary, currentMachineStatus, status);

            res.send({
                success: true,
                summary: updated
            })
        } else {
            console.log(`update summary responsee status ${response.status}`)
        }



    } catch (error) {
        console.log(`update summary ${error}`)
    }

}
export default {
    get,
    update
}