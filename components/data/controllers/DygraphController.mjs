import {
    getStatuses
} from '../../../helpers/fetchFromMainApp.mjs'
import {
    prepareDataForDygraph
} from "../../../tasks/processStatuses/process.mjs"




const get = async (req, res, next) => {
    const {
        machines,
        from,
        to
    } = req.params;
    let finalData = []
    for (let i = 0; i < machines.length; i++) {
        const machineName = machines[i].name;
        const data = await getStatuses(machineName, from, to)
        const statusesForDygraph = await prepareDataForDygraph(data)
        finalData.push(statusesForDygraph)
    }
    res.send({
        data: finalData
    })
    // machines.map((val, index) => {
    //     const machineName = val.name;
    //     const data = getStatuses(machineName, from, to)
    //         .then(data => {
    //             const _statusesForDygraph = prepareDataForDygraph(data);
    //             return {
    //                 statusesForDygraph: _statusesForDygraph,
    //                 name: machineName
    //             };
    //         }).then(data => {
    //             finalData.push({
    //                 data: data.statusesForDygraph,
    //                 name: data.name
    //             })
    //             if (data.length == machines.length) {
    //                 res.send({
    //                     data: data
    //                 })
    //             }
    //         })
    // })
}
const update = async (req, res, next) => {
    try {
        const {
            machineName,
            from,
        } = req.body;

        const {
            dygraph,
            status
        } = req.session.data;
        const result = await getStatuses(machineName, from);
        const currentMachineStatus = result[0].value;
        const dataForDygraph = await updateDataForDygraph(result, dygraph, currentMachineStatus, status);
        req.session.data.dygraph = dataForDygraph;
        res.send({
            success: true,
            dygraph: dataForDygraph,

        })
    } catch (error) {
        console.log(`Update dygraph ${error}`)
    }

}

export default {
    get,
    update
}