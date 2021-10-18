import {
    statusesDictionary
} from "../../../helpers/dictionaries.mjs";
import {
    getStatuses
} from "../../../helpers/fetchFromMainApp.mjs";

const get = async (req, res, next) => {
    const {
        name
    } = req.params;
    const from = new Date();
    const response = await getStatuses(name, from);
    if (response.length) {
        const {
            displayName,
            className
        } = statusesDictionary.filter(({
            statusName
        }) => {
            return statusName == response[0].value;
        });
        //if (status) {
        res.send({
            success: true,
            status: displayName,
            className: className
        })
        //} else {
        //    next()
        //}

    } else {
        next()
    }
}

const update = async (req, res, next) => {
    const {
        name
    } = req.body;
    const from = new Date()
    const response = await getStatuses(name, from)
    if (response.length) {
        const tempStatus = response[0].value == null ? 'DISCONNECT' : response[0].value;
        const currentStatus = statusesDictionary.filter(status => {
            return status.statusName == tempStatus;

        });
        res.send({
            success: true,
            status: currentStatus.length ? currentStatus[0].displayName : 'Błąd ładowania statusu',
            className: currentStatus[0].className
        })



    }
}

export default {
    get,
    update
}