import fetch from 'node-fetch';
import NodeCache from 'node-cache';;


const fetchData = async (url) => {
    try {
        const response = await fetch(`http://${'192.168.2.98'}:${'3000'}/api/v${'1'}/${url}`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${Buffer.from(`${'admin'}:${'test123'}`).toString('base64')}`
            }
        })
        if (response.status === 200) {
            return response.json()
        }
    } catch (error) {

    }
}
export const getGroups = () => fetchData('groups');
export const getMachines = groupName => fetchData(`groups/${groupName}/equipment`);
export const getData = (machineName, from, to) => {
    if (from && to) {
        return fetchData(`equipment/${machineName}/monitorings/conditionWithFeedAndPotentiometr/logs?from=${new Date(from).toISOString()}&to=${new Date(to).toISOString()}`)
    } else if (from) {
        return fetchData(`equipment/${machineName}/monitorings/conditionWithFeedAndPotentiometr/logs?from=${new Date(from).toISOString()}`);
    } else {
        return fetchData(`equipment/${machineName}/monitorings/conditionWithFeedAndPotentiometr/logs?`);
    }
}
export const getFeedValue = (machineName, from, to) => {
    try {
        if (from && to) {
            return fetchData(`equipment/${machineName}/monitorings/Override_path1_${machineName}/logs?from=${new Date(from).toISOString()}&to=${new Date(to).toISOString()}`)

        } else if (from) {
            return fetchData(`equipment/${machineName}/monitorings/Override_path1_${machineName}/logs?from=${new Date(from).toISOString()}`)
        } else {
            return fetchData(`equipment/${machineName}/monitorings/Override_path1_${machineName}/logs?`)
        }
    } catch (error) {

    }
}
export const getStatusesWithPotentiometr = (machineName, from, to) => {
    try {
        if (from && to) {
            return fetchData(`equipment/${machineName}/monitorings/statusesWithPotentiometr/logs?from=${new Date(from).toISOString()}&to=${new Date(to).toISOString()}`)
        } else if (from) {
            return fetchData(`equipment/${machineName}/monitorings/statusesWithPotentiometr/logs?from=${new Date(from).toISOString()}`);
        } else {
            return fetchData(`equipment/${machineName}/monitorings/statusesWithPotentiometr/logs?`);
        }
    } catch (error) {

    }
}
export const getStatuses = (machineName, from, to) => {
    const _from = new Date(from);
    const _to = new Date(to);
    if (_from !== 'Invalid Date' && _to != 'Invalid Date') {
        console.log(`equipment/${machineName}/monitorings/condition2/logs?from=${new Date(_from).toISOString()}&to=${new Date(_to).toISOString()}`)
        return fetchData(`equipment/${machineName}/monitorings/condition2/logs?from=${new Date(_from).toISOString()}&to=${new Date(_to).toISOString()}`)

    } else if (from) {

        return fetchData(`equipment/${machineName}/monitorings/condition2/logs?from=${new Date(_from).toISOString()}`);

    } else {
        return fetchData(`equipment/${machineName}/monitorings/condition2/logs?`);
    }

}

export default fetchData