const statusesDictionary = [{
    statusName: 'ERODOWANIE',
    displayName: 'ERODOWANIE',
    className: 'ERODING'
}, {
    statusName: 'SZLIFOWANIE',
    displayName: 'SZLIFOWANIE',
    className: 'GRINDING'
}, {
    statusName: 'SUSPEND',
    displayName: 'POMIAR',
    className: 'MEASURING'
}, {
    statusName: 'STOP',
    displayName: 'STOP',
    className: 'STOP'
}, {
    statusName: 'MANUAL',
    displayName: 'ZAŁADUNEK ROBOTEM',
    className: 'ROBOT-LOADING'
}, {
    statusName: 'WARMUP',
    displayName: 'ZAŁADUNEK RĘCZNY',
    className: 'MANUAL-LOADING'
}, {
    statusName: 'ALARM',
    displayName: 'ALARM',
    className: 'ALARM'
}, {
    statusName: 'WARNING',
    displayName: 'OSTRZEŻENIE',
    className: 'WARNING'
}, {
    statusName: 'WYMIANA_SCIERNICY',
    displayName: 'WYMIANA ŚCIERNICY',
    className: 'WHEELREPLACEMENT'
}, {
    statusName: 'ROZGRZEWKA',
    displayName: 'ROZGRZEWKA',
    className: 'WARMUP'
}, {
    statusName: 'ZATRZYMANIE',
    displayName: 'ZATRZYMANIE',
    className: 'SUSPEND'
}, {
    statusName: 'PRACA',
    displayName: 'PRACA',
    className: 'WORKING'
}, {
    statusName: 'DISCONNECT',
    displayName: 'WYŁĄCZONA',
    className: 'DISCONNECT'
}, {
    statusName: 'null',
    displayName: 'WYŁĄCZONA',
    className: 'DISCONNECT'
}, {
    statusName: 'DISCONNECT',
    displayName: 'WYŁĄCZONA',
    className: 'DISCONNECT'
}]
const roleDictionary = [{
    roleName: 'administrator',
    displayName: 'Administrator'
}, {
    roleName: 'analitician',
    displayName: 'Analityk'
}, {
    roleName: 'operator',
    displayName: 'Operator'
}, ]
const months = [{
        value: 0,
        name: 'Styczeń',
        from: 1,
        to: 31,
    },
    {
        value: 1,
        name: 'Luty',
        from: 1,
        to: 28,
    },
    {
        value: 2,
        name: 'Marzec',
        from: 1,
        to: 31,
    },
    {
        value: 3,
        name: 'Kwiecień',
        from: 1,
        to: 30,
    }, {
        value: 4,
        name: 'Maj',
        from: 1,
        to: 31,
    }, {
        value: 5,
        name: 'Czerwiec',
        from: 1,
        to: 30,
    }, {
        value: 6,
        name: 'Lipiec',
        from: 1,
        to: 31,
    }, {
        value: 7,
        name: 'Sierpień',
        from: 1,
        to: 31,
    }, {
        value: 8,
        name: 'Wrzesień',
        from: 1,
        to: 30,
    }, {
        value: 9,
        name: 'Październik',
        from: 1,
        to: 31,
    }, {
        value: 10,
        name: 'Listopad',
        from: 1,
        to: 30,
    }, {
        value: 11,
        name: 'Grudzień',
        from: 1,
        to: 31,
    }
]
export {
    statusesDictionary,
    roleDictionary,
    months
}