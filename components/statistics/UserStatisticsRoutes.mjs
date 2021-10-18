import express from 'express';
import Stats from './UserStatisticsModel.mjs';
import {
    parseMillisecondsIntoReadableTime
} from '../../helpers/helpers.mjs';
// import {
//     startSession
// } from 'mongoose';
const router = express.Router();
router.get('/all', (req, res, next) => {
    const login = req.session.user.login;
    if (login) {
        res.render('allStats', {
            title: 'Statystyki | ITA Tools Sp. z o.o',
            jsfiles: 'Stats/All/stats.js',
            cssfiles: 'stats',
            login: login
        })
    } else {
        res.redirect('/login')
    }
})
router.post('/check', async (req, res, next) => {

    try {
        const user = req.session.user.login,
            {
                machine,
            } = req.body,
            now = new Date(),
            day = now.getDate(),
            month = now.getMonth(),
            year = now.getFullYear();

        //TODO: czekam na decyzję mistrzów z Mielca odnosnie zapisu danych
        // console.log(user, machine, now)
        const result = await Stats.findOne({
            user,
            machine,
            createdAt: {
                $gte: new Date(year, month, day),
                $lte: new Date(year, month, day + 1),
            },
            locked: true
        }).exec();
        if (result) {
            res.send({
                success: true,
                exist: true
            })
        } else {
            res.send({
                success: true,
                exist: false
            })
        }
    } catch (error) {

    }
})
router.post('/save', async (req, res, next) => {
    try {
        const user = req.session.user.login,
            {
                machine,
            } = req.body;
        //TODO: czekam na decyzję mistrzów z Mielca odnosnie zapisu danych
        const stats = new Stats({
            user,
            machine,
            locked: true,
        })
        stats.save(error => {
            if (!error) {
                res.send({
                    success: true
                })
            }
        })



    } catch (error) {
        console.log(`Save stats ${error}`)
    }
});

router.put('/lock', async (req, res, next) => {
    try {
        const user = req.session.user.login;
        const {
            machine
        } = req.body;

        const result = await Stats.findOneAndUpdate({
            user,
            machine,
            locked: false,
            createdAt: {
                $lte: new Date().toISOString()
            }
        }, {
            locked: true
        })
        if (result) {
            res.send({
                success: true
            })
        } else {
            console.log(`Lock stats ${result}`)
        }
    } catch (error) {
        console.log(`Lock stats error ${error}`)
    }
})
router.put('/unlock', async (req, res, next) => {
    try {
        const user = req.session.user.login;
        const {
            machine
        } = req.body;

        const result = await Stats.findOneAndUpdate({
            user,
            machine,
            locked: true,
            createdAt: {
                $lte: new Date().toISOString()
            }
        }, {
            locked: false
        })
        if (result) {
            res.send({
                success: true
            })
        }
    } catch (error) {

    }
})
router.put('/update', async (req, res, next) => {
    try {
        const user = req.session.user.login,
            {
                machine,
            } = req.body,
            now = new Date(),
            day = now.getDate(),
            month = now.getMonth(),
            year = now.getFullYear();
        // console.log(user, machine, new Date(year, month, day), new Date(year, month, day + 1))
        const result = await Stats.findOne({
            user,
            machine,
            createdAt: {
                $gte: new Date(year, month, day),
                $lte: new Date(year, month, day + 1),
            },
            locked: true
        }).exec();
        // console.log(`STATYSTYKI DO AKT`, result)
        if (result) {
            if (result.data) {
                const updatedData = Object.entries(req.session.data.current.summary),
                    lastSavedData = Object.entries(result.data);

                let temporaryDataArray = []
                if (updatedData.length === lastSavedData.length) {
                    for (let i = 0; i < updatedData.length; i++) {
                        const updatedDataStatusName = updatedData[i][0],
                            updatedDataTimeValue = updatedData[i][1];
                        let lastSavedDataStatusName = lastSavedData[i][0],
                            lastSavedDataTimeValue = lastSavedData[i][1];
                        if (updatedDataStatusName === lastSavedDataStatusName) {
                            lastSavedDataTimeValue.data.time += updatedDataTimeValue.data.time;
                            temporaryDataArray.push([
                                lastSavedDataStatusName,
                                lastSavedDataTimeValue
                            ])

                        }

                    }

                    const final = Object.fromEntries(temporaryDataArray)
                    const result = await Stats.findOneAndUpdate({
                        user,
                        machine,
                        createdAt: {
                            $gte: new Date(year, month, day),
                            $lte: new Date(year, month, day + 1),
                        },
                        locked: true
                    }, {
                        data: final
                    }).exec();
                    if (result) {
                        const timeDifferenceInMilliseconds = new Date(result.updatedAt) - new Date(result.createdAt)
                        const readableTimeDifference = parseMillisecondsIntoReadableTime(timeDifferenceInMilliseconds)
                        res.send({
                            success: true,
                            message: [`Zakończyłeś pracę na maszynie ${machine}. Twój czas pracy: ${readableTimeDifference}`]
                        })
                    }
                }
            } else {
                const data = req.session.data.current.summary
                const result = await Stats.findOneAndUpdate({
                    user,
                    machine,
                    createdAt: {
                        $gte: new Date(year, month, day),
                        $lte: new Date(year, month, day + 1),
                    },
                    locked: true
                }, {
                    data
                }).exec();
                if (result) {
                    const timeDifferenceInMilliseconds = new Date(result.updatedAt) - new Date(result.createdAt)
                    const readableTimeDifference = parseMillisecondsIntoReadableTime(timeDifferenceInMilliseconds)
                    res.send({
                        success: true,
                        message: [`Zakończyłeś pracę na maszynie ${machine}. Twój czas pracy: ${readableTimeDifference}`]
                    })
                }
            }

        }
    } catch (error) {
        console.log(`Save stats ${error}`);
    }

});
router.post('/get/all', (req, res, next) => {
    const start = req.body.start,
        end = req.body.end,
        user = req.body.user;
    console.log(req.body)
    Stats.find({
        start: {
            $gte: new Date(start)
        },
        // end: {
        //     $lte: new Date(end)
        // },
        user: user
    }, (err, data) => {
        if (err) {
            res.send({
                status: 500,
                error: err
            })
        } else {
            if (data.length) {
                res.send({
                    status: 200,
                    data: data
                })
            } else {
                res.status(200).send({
                    status: 500,
                    message: ['W podanym okresie nie ma statystyk do wyświetlenia']
                })
            }

        }
    })
})
router.get('/get/user=:user', (req, res, next) => {
    try {
        const {
            user,
        } = req.params;
        Stats.find({
            user,
        }, (error, document) => {
            console.log(document)
            if (document.length) {
                let stats = []
                for (let i = 0; i < document.length; i++) {
                    if (document[i].data && document[i].data !== null) {
                        stats.push(document[i])
                    }

                }
                if (stats.length) {
                    res.send({
                        success: true,
                        data: stats
                    })
                } else {
                    res.send({
                        success: false,
                        message: ['Brak danych dla tego użytkownika']
                    })
                }

            } else {
                res.send({
                    success: false,
                    message: ['Brak danych dla tego użytkownika']
                })
            }
        })


    } catch (error) {
        console.log(error)
    }
})
router.get('/get/user=:user/start=:start&end=:end', (req, res, next) => {
    try {
        const {
            user,
            start,
            end
        } = req.params;
        Stats.find({
            user,
            start: {
                $gte: new Date(start).toISOString()
            },
            end: {
                $lte: new Date(end).toISOString()
            }
        }, (error, document) => {
            console.log(error)
            console.log(document)
            if (document.length) {
                res.send({
                    success: true,
                    data: document
                })
            } else {
                res.send({
                    success: false,
                    message: ['Brak danych w podanym zakresie']
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
})

const connectSummaryStatistics = (dbData, sessionData) => {
    try {

    } catch (error) {
        console.log(`Connect summary statistics ${error}`)
    }
}
export default router;