import {
    machineTypes
} from "../../config/machineTypes.mjs";
import {
    getGroups,
    getMachines,
    getFeedValue
} from "../../helpers/fetchFromMainApp.mjs";
import {
    Machines
} from './models/MachinesModel.mjs'
import LockedMachines from './models/LockedMachines.mjs'
import Users from "../users/models/UsersModel.mjs";
import {
    getAndPrepareMachines
} from '../../tasks/machines/machines.mjs'

const get = async (req, res, next) => {
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
                    res.send({
                        success: true,
                        machines: machinesArray
                    })
                }
            }
        }
    } catch (error) {
        console.log(`Get machines: ${error}`)
    }
}
const getByUser = async (req, res, next) => {
    try {
        const {
            login
        } = req.user;
        const {
            machinesAccess
        } = await Users.findOne({
            login
        }, {
            machinesAccess: 1
        }).exec()

        if (machinesAccess) {
            let machinesArray = [];
            for (let i = 0, length = machinesAccess.view.length; i < length; i++) {
                machineTypes.filter(({
                    name,
                    type
                }) => {
                    if (name == machinesAccess.view[i]) {
                        machinesArray.push({
                            name,
                            type
                        })
                    }
                })
            }
            console.log(machinesArray)
            res.send({
                success: true,
                machines: machinesArray
            })
        }

    } catch (error) {
        console.log(`Get machines ${error}`)
    }
}
const getMachinesByUser = async (req, res, next) => {
    try {
        const {
            machineName
        } = req.params;
        const machine = await Machines.findOne({
            machineName,
        }).exec();
        const users = await Users.find().exec();
        if (machine) {
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
            let availableUsers = [];
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
        console.log(`Get machines ${error}`)
    }
}
const update = async (req, res, next) => {
    try {
        const groups = await getGroups();
        if (groups.length) {
            const firstHall = groups[0].name;
            const actualMachines = await getMachines(firstHall)
            const oldMachines = await Machines.find().exec()
            let counter = 0;
            if (actualMachines.length && oldMachines.length) {
                for (let i = 0, length = actualMachines.length; i < length; i++) {
                    const actualMachineName = actualMachines[i].name;
                    const index = oldMachines.findIndex(obj => obj.machineName == actualMachineName)
                    if (index == -1) {
                        machineTypes.forEach(type => {
                            if (type.name === actualMachineName) {
                                const newMachine = new Machines({
                                    machineName: actualMachineName,
                                    machineType: type.type
                                })
                                newMachine.save()
                                counter++;
                            }
                        })
                    }

                }
                res.send({
                    success: true,
                    message: counter ? [`Pomyślnie dodano ${counter} maszyn`] : ['Nie dodano żadnej maszyny']
                })
            } else {
                for (let i = 0; i < actualMachines.length; i++) {
                    const actualMachineName = actualMachines[i].name;
                    machineTypes.forEach(type => {
                        if (type.name === actualMachineName) {
                            const newMachine = new Machines({
                                machineName: actualMachineName,
                                machineType: type.type
                            })
                            newMachine.save()
                            counter++;
                        }
                    })

                }
            }
        }
    } catch (error) {
        console.log(`update machines ${error}`)
    }
}
const updateMachinesByUser = async (req, res, next) => {
    try {
        const {
            machineName
        } = req.params, {
            login
        } = req.body;

        const machines = await Machines.findOne({
            machineName
        }).exec();
        const user = await Users.findOne({
            login
        }).exec();
        if (machines) {
            machines.users.push(login)
            user.machinesAccess.view.push(machineName)
            await machines.save();
            await user.save();
            res.send({
                success: true
            })

        } else {
            const machine = new Machines({
                machineName,
                users: [login]
            })
            machine.save(() => {
                res.send({
                    success: true
                })
            })
        }
    } catch (error) {
        console.log(`update machines ${error}`)
    }
}
const deleteMachinesByUser = async (req, res, next) => {
    try {
        const {
            machineName,
        } = req.params;
        const {
            login
        } = req.params;

        const machine = await Machines.findOne({
            machineName
        }).exec();
        const user = await Users.findOne({
            login
        }).exec();
        // console.log(machine, user)
        if (machine && user) {
            const filteredMachine = machine.users.filter(user => {
                if (user !== login) {
                    return user
                }
            })
            // console.log(user.machinesAccess)
            const filteredUser = user.machinesAccess.view.filter(machine => {
                // console.log(machine, machineName)
                if (machine !== machineName) {
                    return machine
                }
            })

            machine.users = filteredMachine;
            user.machinesAccess.view = filteredUser;

            machine.save()
            user.save()
            res.send({
                success: true
            })

        }

    } catch (error) {
        console.log(`Delete access for machine ${error}`)
    }
}
const checkMachineIsLockedByUser = async (req, res, next) => {
    const {
        login
    } = req.user, {
        machineName
    } = req.params;

    const machine = await LockedMachines.findOne({
        machineName,
        lock: true
    }).exec();
    if (machine) {
        if (machine.login === login) {
            console.log('Ponownie')
            res.send({
                success: true,
                locked: true,
                message: [`Witaj ponownie ${login}`]
            })
        } else {
            console.log('Nie możesz')
            res.send({
                success: false,
                locked: true,
                message: [`Nie możesz używać tej maszyny-jest zajęta przez ${login}`]
            })
        }
    } else {
        console.log('Pierwszy raz')
        res.send({
            success: true,
            locked: false
        })
    }
}
const lockMachine = async (req, res, next) => {
    try {
        const {
            login
        } = req.session.user;
        const {
            machineName
        } = req.body;
        const lockedMachine = new LockedMachines({
            login,
            machineName,
            lock: true,
        })
        const machine = await lockedMachine.save();
        if (machine) {
            res.send({
                success: true,
                locked: true
            })
        }
    } catch (error) {
        console.log(`Lock machine error ${error}`)
    }
}
const unlockMachine = async (req, res, next) => {
    try {
        if (req.body.login) {
            const {
                machineName,
                login
            } = req.body;
            const updated = await LockedMachines.findOneAndUpdate({
                login,
                machineName,
                lock: true
            }, {
                lock: false
            }).exec()
            if (updated) {
                res.send({
                    success: true,
                    message: [`Zakończono pracę na maszynie ${machineName}. Czas pracy: będzie kiedyś`]
                })
            }
        } else {
            const {
                login
            } = req.session.user;
            const updated = await LockedMachines.findOneAndUpdate({
                login,
                machineName,
                lock: true
            }, {
                lock: false
            }).exec()
            if (updated) {
                res.send({
                    success: true,
                    message: [`Zakończono pracę na maszynie ${machineName}. Czas pracy: będzie kiedyś`]
                })
            }
        }





    } catch (error) {
        console.log(`Unlock machine error ${error}`)
    }

}
const lockedMachines = (req, res, next) => {
    try {
        LockedMachines.find({
            lock: true
        }, (error, machines) => {
            if (!error) {
                if (machines) {
                    res.send({
                        success: true,
                        machines
                    })
                }
            }
        })
    } catch (error) {
        console.log(`Get locked machines error ${error}`)
    }
}
const getMachinesFeed = async (req, res, next) => {
    try {
        const {
            machineName,
            from,
            to
        } = req.params;
        if (machineName) {
            const feed = await getFeedValue(machineName, from, to)
            res.send({
                success: true,
                feed
            })
        } else {
            const machines = await getAndPrepareMachines(),
                feedValues = [];
            for (let i = 0; i < machines.length; i++) {
                const machineName = machines[i].name;
                const result = await getFeedValue(machineName, new Date())
                if (result) {
                    if (result.length) {
                        if (result[0].value !== null) {
                            feedValues.push({
                                machineName,
                                feedValue: result[0].value
                            })
                        }

                    }

                }
            }
            res.send({
                success: true,
                feedValues
            })
        }

    } catch (error) {
        console.log(`Machines get feed error ${error}`);
    }
}
export default {
    get,
    getByUser,
    getMachinesByUser,
    update,
    updateMachinesByUser,
    deleteMachinesByUser,
    checkMachineIsLockedByUser,
    lockMachine,
    unlockMachine,
    lockedMachines,
    getMachinesFeed,
}