import {
    getGroups,
    getMachines
} from '../../helpers/fetchFromMainApp.mjs'
import {
    machineTypes
} from '../../config/machineTypes.mjs';



export const getAndPrepareMachines = async () => {
    try {
        const groups = await getGroups();
        if (groups.length) {
            const firstHall = groups[0].name;
            const machines = await getMachines(firstHall)
            if (machines.length) {
                if (machines) {
                    let machinesArray = [];
                    for (let i = 0, Alength = machines.length; i < Alength; i++) {
                        machineTypes.filter(machine => {
                            if (machine.name === machines[i].name) {
                                machinesArray.push({
                                    name: machine.name,
                                    type: machine.type
                                })
                            }

                        })
                    }
                    return machinesArray
                }
            }
        }
    } catch (error) {
        console.log(`Get machines: ${error}`)
    }
}