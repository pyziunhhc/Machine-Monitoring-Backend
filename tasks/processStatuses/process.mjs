export const prepareSummaryData = async (data, from, to) => {
    let summaryMachineStatistics = {
        firstStatus: {
            name: '',
            data: {
                time: 0,
                show: false
            }
        },
        lastStatus: {
            name: '',
            data: {
                time: 0,
                show: false
            }
        },
        erodowanie: {
            name: 'erodowanie',
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0,
                show: true
            },
            options: {
                displayName: 'Erodowanie',
                className: 'eroding',
                colors: {
                    rgba: 'rgba(0, 82, 20, 0.9)',
                    argb: '005214'
                },
            },
        },
        szlifowanie: {
            name: 'szlifowanie',
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0,
                show: true
            },
            options: {
                displayName: 'Szlifowanie',
                className: 'grinding',
                colors: {
                    rgba: 'rgba(0, 209, 44, 0.9)',
                    argb: '00D12C'
                },
            }

        },
        praca: {
            name: 'praca',
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0,
                show: true
            },
            options: {
                displayName: 'Praca',
                className: 'working',
                colors: {
                    rgba: 'rgba(0, 82, 20, 0.9)',
                    argb: '005214'
                },
            }
        },
        disconnect: {
            name: 'disconnect',
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0,
                show: true
            },
            options: {
                displayName: 'Wyłączona',
                className: 'disconnect',
                colors: {
                    rgba: 'rgba(145, 145, 145, 1)',
                    argb: '919191'
                },
            }
        },
        manual: {
            name: 'manual',
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0,
                show: true
            },
            options: {
                displayName: 'Załadunek\nRobotem',
                className: 'robotLoading',
                colors: {
                    rgba: 'rgba(200,0,200,1)',
                    argb: 'C800C8'
                },
            }
        },
        warmup: {
            name: 'warmup',
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0,
                show: true
            },
            options: {
                displayName: 'Załadunek Ręczny',
                className: 'manualLoading',
                colors: {
                    rgba: 'rgba(81, 182, 215,1)',
                    argb: '51B6D7'
                },
            }
        },
        stop: {
            name: 'stop',
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0,
                show: true
            },
            options: {
                displayName: 'Stop',
                className: 'stop',
                colors: {
                    rgba: 'rgba(243, 230, 0, 1)',
                    argb: 'F3E600'
                },
            }
        },
        suspend: {
            name: 'suspend',
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0,
                show: true
            },
            options: {
                displayName: 'Pomiar',
                className: 'measuring',
                colors: {
                    rgba: 'rgba(255, 177, 51, 1)',
                    argb: 'FFB133'
                },
            }
        },
        emergency: {
            name: 'emergency',
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0,
                show: true
            },
            options: {
                displayName: 'Alarm',
                className: 'alarm',
                colors: {
                    rgba: 'rgba(255,0,0,1)',
                    argb: 'FF0000'
                },
            }
        },
        rozgrzewka: {
            name: 'rozgrzewka',
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0,
                show: true
            },
            options: {
                displayName: 'Rozgrzewka',
                className: 'warmup',
                colors: {
                    rgba: 'rgba(168,80,80,1)',
                    argb: 'A85050'
                },
            }
        },
        wymiana_sciernicy: {
            name: 'wymiana_sciernicy',
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0,
                show: true
            },
            options: {
                displayName: 'Wymiana\nŚciernicy',
                className: 'wheelReplacement',
                colors: {
                    rgba: 'rgba(0,0,0,1)',
                    argb: '000000'
                },
            }
        },
        wymianaNarzedzia: {
            name: 'wymianaNarzedzia',
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0,
                show: true
            },
            options: {
                displayName: 'Wymiana\nNarzędzia',
                className: 'toolChange',
                colors: {
                    rgba: 'rgba(206, 183, 119, 1)',
                    argb: 'CEB777'
                },
            }
        },
        przejscie: {
            name: 'przejscie',
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0,
                show: true
            },
            options: {
                displayName: 'Przejście',
                className: 'transition',
                colors: {
                    rgba: 'rgba(255,112,183,1)',
                    argb: 'FF70B7'
                },
            }
        },
        zatrzymanie: {
            name: 'zatrzymanie',
            data: {
                time: 0,
                feed: 0,
                averageFeed: 0,
                potentiometr: 0,
                percentage: 0,
                show: true
            },
            options: {
                displayName: 'Zatrzymanie',
                className: 'suspend',
                colors: {
                    rgba: 'rgba(145,19,19,1)',
                    argb: '911313'
                },
            }
        },
        sumOfTimes: {
            name: 'suma',

            data: {
                time: 0,
                show: false
            },
            options: {
                displayName: 'Suma',
                colors: {
                    rgba: 'rgba(255,255,255,1)',
                    argb: 'FFFFFF'
                },
            }
        },
    };

    for (let index = 0, arrayLength = data.length; index < arrayLength; index++) {
        let start = new Date(data[index].start),
            end = data[index].end ? new Date(data[index].end) : null,
            time = end ? end - start : 1000,
            status = `${data[index].value}`;
        if (arrayLength === 1) {

        }
        if (index === 0) {
            if (start != new Date(from)) {
                if (end != null) {
                    console.log(end, new Date(from))
                    time = end - new Date(from)
                }
            }
        }
        if (index == arrayLength - 1) {
            if (end) {
                if (end != new Date(to)) {
                    time = new Date(to) - start;
                }
            }
        }
        summaryMachineStatistics.sumOfTimes.data.time += time;
        switch (status) {
            case 'ERODOWANIE':
                summaryMachineStatistics.erodowanie.data.time += time;
                break;
            case 'SZLIFOWANIE':
                summaryMachineStatistics.szlifowanie.data.time += time;
                break;
            case 'DISCONNECT':
                summaryMachineStatistics.disconnect.data.time += time;
                break;
            case 'null':
                summaryMachineStatistics.disconnect.data.time += time;
                break;
            case 'WARMUP':
                summaryMachineStatistics.warmup.data.time += time;
                break;
            case 'MANUAL':
                summaryMachineStatistics.manual.data.time += time;
                break;
            case 'WYMIANA_SCIERNICY':
                summaryMachineStatistics.wymiana_sciernicy.data.time += time;
                break;
            case 'STOP':
                summaryMachineStatistics.stop.data.time += time;
                break;
            case 'SUSPEND':
                summaryMachineStatistics.suspend.data.time += time;
                break;
            case 'EMERGENCY':
                summaryMachineStatistics.emergency.data.time += time;
                break;
            case 'ROZGRZEWKA':
                summaryMachineStatistics.rozgrzewka.data.time += time;
                break;
            case 'ZATRZYMANIE':
                summaryMachineStatistics.zatrzymanie.data.time += time;
                break;
            case 'PRACA':
                summaryMachineStatistics.praca.data.time += time;
                break;
        }
        if (index === data.length - 1) {
            Object.values(summaryMachineStatistics)
                .forEach(stat => {
                    stat.data.percentage = ((stat.data.time * 100) / summaryMachineStatistics.sumOfTimes.data.time).toFixed(2)
                })
        }
    }
    return summaryMachineStatistics;
}
export const prepareDataForDygraph = async (data) => {
    let machineStatsForDygraph = [];

    for (let i = 0, arrayLength = data.length; i < arrayLength; i++) {
        let start = new Date(data[i].start),
            end = new Date(data[i].end),
            time = end - start,
            feedValue = 0,
            status = `${data[i].value}`;

        if (data[i].end == null) {
            time = new Date() - start;
        }
        switch (status) {
            case 'ERODOWANIE':
                machineStatsForDygraph.push([start, feedValue, time, null, null, null, null, null, null, null, null, null, null, null, null, null]);
                break;
            case 'SZLIFOWANIE':
                machineStatsForDygraph.push([start, feedValue, null, time, null, null, null, null, null, null, null, null, null, null, null, null]);
                break;
            case 'DISCONNECT':
                machineStatsForDygraph.push([start, feedValue, null, null, time, null, null, null, null, null, null, null, null, null, null, null]);
                break;
            case 'null':
                machineStatsForDygraph.push([start, feedValue, null, null, time, null, null, null, null, null, null, null, null, null, null, null]);
                break;
            case 'WARMUP':
                machineStatsForDygraph.push([start, feedValue, null, null, null, time, null, null, null, null, null, null, null, null, null, null]);
                break;
            case 'MANUAL':
                machineStatsForDygraph.push([start, feedValue, null, null, null, null, time, null, null, null, null, null, null, null, null, null]);
                break;
            case 'WYMIANA':
                machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, null, null, time, null, null, null, null, null]);
                break;
            case 'STOP':
                machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, time, null, null, null, null, null, null, null, null]);
                break;
            case 'SUSPEND':
                machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, time, null, null, null, null, null, null, null]);
                break;
            case 'EMERGENCY':
                machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, null, time, null, null, null, null, null, null]);
                break;
            case 'ROZGRZEWKA':
                machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, null, null, null, null, null, time, null, null]);
                break;
            case 'ZATRZYMANIE':
                machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, null, null, null, null, null, null, time, null]);
                break;
            case 'PRACA':
                machineStatsForDygraph.push([start, feedValue, null, null, null, null, null, null, null, null, null, null, null, null, null, time]);
                break;
        }
    }
    return machineStatsForDygraph;

}
export const prepareDataForChartJS = async (data) => {
    try {
        let avaibleLabels = [],
            statusesColors = [],
            percentageValuesForChartJS = [],
            timeValuesForChartJS = [];
        Object.values(data)
            .filter(values => {
                return values.data.time > 0;
            })
            .map(values => {
                if (values.name) {
                    avaibleLabels.push(`${values.options.displayName}`);
                    statusesColors.push(values.options.colors.rgba)
                }
                return values;
            })
            .map((values, index) => {
                if (values.name) {
                    percentageValuesForChartJS.push((parseFloat(values.data.time) * 100 / data.sumOfTimes.data.time).toFixed(2));
                }
                return values;
            })
            .map(values => {
                if (values.name) {
                    timeValuesForChartJS.push(new Date(values.data.time));
                }

                return values;
            })
        return {
            labels: avaibleLabels,
            colors: statusesColors,
            percentage: percentageValuesForChartJS,
            time: timeValuesForChartJS
        }
    } catch (error) {
        console.log(`Prepare data for chartjs error ${error}`)
    }


}
export const updateSummaryData = async (newData, oldData, currentStatus, lastStatus) => {
    try {
        if (currentStatus != lastStatus) {
            const sumMachineStats = oldData,
                status = `${newData[0].value}`;
            switch (status) {
                case 'ERODOWANIE':
                    sumMachineStats.erodowanie.data.time += 1000;
                    break;
                case 'SZLIFOWANIE':
                    sumMachineStats.szlifowanie.data.time += 1000;
                    break;
                case 'PRACA':
                    sumMachineStats.praca.data.time += 1000;
                    break;
                case 'DISCONNECT':
                    sumMachineStats.disconnect.data.time += 1000;
                    break;
                case 'null':
                    sumMachineStats.disconnect.data.time += 1000;
                    break;
                case 'MANUAL':
                    sumMachineStats.manual.data.time += 1000;
                    break;
                case 'WARMUP':
                    sumMachineStats.warmup.data.time += 1000;
                    break;
                case 'WYMIANA_SCIERNICY':
                    sumMachineStats.wymiana_sciernicy.data.time += 1000;
                    break;
                case 'STOP':
                    sumMachineStats.stop.data.time += 1000;
                    break;
                case 'SUSPEND':
                    sumMachineStats.suspend.data.time += 1000;
                    break;
                case 'EMERGENCY':
                    sumMachineStats.emergency.data.time += 1000;
                    break;
                case 'ROZGRZEWKA':
                    sumMachineStats.rozgrzewka.data.time += 1000;
                    break;
                case 'ZATRZYMANIE':
                    sumMachineStats.suspend.data.time += 1000;
                    break;
            }
            sumMachineStats.sumOfTimes.data.time += 1000;
            Object.values(sumMachineStats)
                .forEach(stat => {
                    stat.data.percentage = ((stat.data.time * 100) / sumMachineStats.sumOfTimes.data.time).toFixed(2)
                })
            return sumMachineStats;
        } else {

            const sumMachineStats = oldData;
            if (currentStatus == 'null') {
                sumMachineStats.disconnect.data.time += 1000;
            } else {
                sumMachineStats[currentStatus.toLowerCase()].data.time += 1000;
            }
            sumMachineStats.sumOfTimes.data.time += 1000;
            Object.values(sumMachineStats)
                .forEach(stat => {
                    stat.data.percentage = ((stat.data.time * 100) / sumMachineStats.sumOfTimes.data.time).toFixed(2)
                })
            return sumMachineStats;
        }

    } catch (error) {
        console.log(`Update summary data error ${error}`)
    }

}
export const updateDataForDygraph = async (newData, oldData, currentStatus, lastStatus) => {
    try {
        if (currentStatus != lastStatus) {
            let machineStatsForDygraph = oldData;
            for (let i = 0, arrayLength; i < arrayLength; i++) {
                const start = new Date(data[i].start),
                    end = new Date(),
                    time = end - start,
                    status = `${data[i].value}`,
                    feedValue = 0;
                switch (status) {
                    case 'ERODOWANIE':
                        machineStatsForDygraph.push([new Date(start), feedValue, time, null, null, null, null, null, null, null, null, null, null, null, null, null]);
                        break;
                    case 'SZLIFOWANIE':
                        machineStatsForDygraph.push([new Date(start), feedValue, null, time, null, null, null, null, null, null, null, null, null, null, null, null]);
                        break;
                    case 'DISCONNECT':
                        machineStatsForDygraph.push([new Date(start), feedValue, null, null, time, null, null, null, null, null, null, null, null, null, null, null]);
                        break;
                    case 'null':
                        machineStatsForDygraph.push([new Date(start), feedValue, null, null, time, null, null, null, null, null, null, null, null, null, null, null]);
                        break;
                    case 'WARMUP':
                        machineStatsForDygraph.push([new Date(start), feedValue, null, null, null, time, null, null, null, null, null, null, null, null, null, null]);
                        break;
                    case 'MANUAL':
                        machineStatsForDygraph.push([new Date(start), feedValue, null, null, null, null, time, null, null, null, null, null, null, null, null, null]);
                        break;
                    case 'WYMIANA':
                        machineStatsForDygraph.push([new Date(start), feedValue, null, null, null, null, null, null, null, null, time, null, null, null, null, null])
                        break;
                    case 'STOP':
                        machineStatsForDygraph.push([new Date(start), feedValue, null, null, null, null, null, time, null, null, null, null, null, null, null, null]);
                        break;
                    case 'SUSPEND':
                        machineStatsForDygraph.push([new Date(start), feedValue, null, null, null, null, null, null, time, null, null, null, null, null, null, null]);
                        break;
                    case 'EMERGENCY':
                        machineStatsForDygraph.push([new Date(start), feedValue, null, null, null, null, null, null, null, time, null, null, null, null, null, null]);
                        break;
                    case 'ROZGRZEWKA':
                        machineStatsForDygraph.push([new Date(start), feedValue, null, null, null, null, null, null, null, null, null, null, null, time, null, null]);
                        break;
                    case 'ZATRZYMANIE':
                        machineStatsForDygraph.push([new Date(start), feedValue, null, null, null, null, null, null, null, null, null, null, null, null, time, null]);
                        break;
                    case 'PRACA':
                        machineStatsForDygraph.push([new Date(start), feedValue, null, null, null, null, null, null, null, null, null, null, null, null, null, time]);
                        break;
                }
            }
            //console.log(machineStatsForDygraph.length)
            return machineStatsForDygraph;
        } else {
            return oldData;
        }
    } catch (error) {
        console.log(`Update dygraph error ${error}`)
    }


}
export const updateDataForChartJS = async (data) => {
    try {
        let avaibleLabels = [],
            statusesColors = [],
            percentageValuesForChartJS = [],
            timeValuesForChartJS = [];
        Object.values(data)
            .filter(values => {
                return values.data.time > 0;
            })
            .map(values => {
                if (values.name) {
                    avaibleLabels.push(`${values.options.displayName}`);
                    statusesColors.push(values.options.colors.rgba)
                }
                return values;
            })
            .map((values, index) => {
                if (values.name) {
                    percentageValuesForChartJS.push((parseFloat(values.data.time) * 100 / data.sumOfTimes.data.time).toFixed(2));
                }
                return values;
            })
            .map(values => {
                if (values.name) {
                    timeValuesForChartJS.push(new Date(values.data.time));
                }

                return values;
            })
        return {
            labels: avaibleLabels,
            colors: statusesColors,
            percentage: percentageValuesForChartJS,
            time: timeValuesForChartJS
        }
    } catch (error) {
        console.log(`Update chartJS error ${error}`)
    }

}