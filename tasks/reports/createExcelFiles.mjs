import Excel4node from 'excel4node';
import {
    months
} from "../../helpers/dictionaries.mjs";
import {
    parseMillisecondsIntoReadableTime
} from '../../helpers/helpers.mjs'
import path from 'path'
const style = {
    border: {
        left: {
            style: 'thin',
            color: '#000000'
        },
        right: {
            style: 'thin',
            color: '#000000'
        },
        top: {
            style: 'thin',
            color: '#000000'
        },
        bottom: {
            style: 'thin',
            color: '#000000'
        }
    },
    font: {
        color: 'white',
        bold: true
    },
    fill: {
        type: 'pattern',
        patternType: 'solid',
        fgColor: `#000000`
    }
}

const addToCell = (type, data, worksheet, machineName, tempCellNumber) => {
    try {
        let cellNumber = tempCellNumber;
        const sumOfTime = data.sumOfTimes.data.time;

        const month = months.filter(value => {
            if (value.value == new Date().getMonth() - 1) {
                return value.name
            }
        })
        const lastMonthDay = month[0].to;
        Object.values(data)
            .map((value, index) => {
                if (value.data.time) {
                    const time = parseMillisecondsIntoReadableTime(value.data.time);
                    const averageDailyTime = parseMillisecondsIntoReadableTime(value.data.time / lastMonthDay)
                    const percentage = `${((value.data.time/sumOfTime)*100).toFixed(2)}%`;
                    if (value.options.displayName === 'Suma') {
                        worksheet.cell(cellNumber, 1)
                            .string('Suma')
                            .style(style)
                        worksheet.cell(cellNumber, 2)
                            .string('')
                            .style(style)
                        worksheet.cell(cellNumber, 3)
                            .string(time)
                            .style(style)
                        worksheet.cell(cellNumber, 4)
                            .string(percentage)
                            .style(style)
                        if (type === 'monthly') {
                            worksheet.cell(cellNumber, 5)
                                .string(percentage)
                                .style(style)
                        }

                        cellNumber++;
                        worksheet.cell(cellNumber, 1)
                            .string('')
                            .style(style)
                        worksheet.cell(cellNumber, 2)
                            .string('')
                            .style(style)
                        worksheet.cell(cellNumber, 3)
                            .string('')
                            .style(style)
                        worksheet.cell(cellNumber, 4)
                            .string('')
                            .style(style)
                        if (type === 'monthly') {
                            worksheet.cell(cellNumber, 5)
                                .string(percentage)
                                .style(style)
                        }
                    } else {
                        worksheet.cell(cellNumber, 1)
                            .string(machineName)
                            .style({
                                border: {
                                    left: {
                                        style: 'thin',
                                        color: '#000000'
                                    },
                                    right: {
                                        style: 'thin',
                                        color: '#000000'
                                    },
                                    top: {
                                        style: 'thin',
                                        color: '#000000'
                                    },
                                    bottom: {
                                        style: 'thin',
                                        color: '#000000'
                                    }
                                },
                                font: {
                                    color: 'white'
                                },
                                fill: {
                                    type: 'pattern',
                                    patternType: 'solid',
                                    fgColor: `#${value.options.colors.argb}`
                                }
                            })
                        worksheet.cell(cellNumber, 2)
                            .string(value.options.displayName)
                            .style({
                                border: {
                                    left: {
                                        style: 'thin',
                                        color: '#000000'
                                    },
                                    right: {
                                        style: 'thin',
                                        color: '#000000'
                                    },
                                    top: {
                                        style: 'thin',
                                        color: '#000000'
                                    },
                                    bottom: {
                                        style: 'thin',
                                        color: '#000000'
                                    }
                                },
                                font: {
                                    color: 'white'
                                },
                                fill: {
                                    type: 'pattern',
                                    patternType: 'solid',
                                    fgColor: `#${value.options.colors.argb}`
                                }
                            })
                        worksheet.cell(cellNumber, 3)
                            .string(time)
                            .style({
                                border: {
                                    left: {
                                        style: 'thin',
                                        color: '#000000'
                                    },
                                    right: {
                                        style: 'thin',
                                        color: '#000000'
                                    },
                                    top: {
                                        style: 'thin',
                                        color: '#000000'
                                    },
                                    bottom: {
                                        style: 'thin',
                                        color: '#000000'
                                    }
                                },
                                font: {
                                    color: 'white'
                                },
                                fill: {
                                    type: 'pattern',
                                    patternType: 'solid',
                                    fgColor: `#${value.options.colors.argb}`
                                }
                            })
                        if (type === 'monthly') {
                            worksheet.cell(cellNumber, 4)
                                .string(averageDailyTime)
                                .style({
                                    border: {
                                        left: {
                                            style: 'thin',
                                            color: '#000000'
                                        },
                                        right: {
                                            style: 'thin',
                                            color: '#000000'
                                        },
                                        top: {
                                            style: 'thin',
                                            color: '#000000'
                                        },
                                        bottom: {
                                            style: 'thin',
                                            color: '#000000'
                                        }
                                    },
                                    font: {
                                        color: 'white'
                                    },
                                    fill: {
                                        type: 'pattern',
                                        patternType: 'solid',
                                        fgColor: `#${value.options.colors.argb}`
                                    }
                                })
                            worksheet.cell(cellNumber, 5)
                                .string(percentage)
                                .style({
                                    border: {
                                        left: {
                                            style: 'thin',
                                            color: '#000000'
                                        },
                                        right: {
                                            style: 'thin',
                                            color: '#000000'
                                        },
                                        top: {
                                            style: 'thin',
                                            color: '#000000'
                                        },
                                        bottom: {
                                            style: 'thin',
                                            color: '#000000'
                                        }
                                    },
                                    font: {
                                        color: 'white'
                                    },
                                    fill: {
                                        type: 'pattern',
                                        patternType: 'solid',
                                        fgColor: `#${value.options.colors.argb}`
                                    }
                                })
                        } else {
                            worksheet.cell(cellNumber, 4)
                                .string(percentage)
                                .style({
                                    border: {
                                        left: {
                                            style: 'thin',
                                            color: '#000000'
                                        },
                                        right: {
                                            style: 'thin',
                                            color: '#000000'
                                        },
                                        top: {
                                            style: 'thin',
                                            color: '#000000'
                                        },
                                        bottom: {
                                            style: 'thin',
                                            color: '#000000'
                                        }
                                    },
                                    font: {
                                        color: 'white'
                                    },
                                    fill: {
                                        type: 'pattern',
                                        patternType: 'solid',
                                        fgColor: `#${value.options.colors.argb}`
                                    }
                                })
                        }


                    }
                    cellNumber++;
                }
            })
        return cellNumber
    } catch (error) {
        console.log(error)
    }

}

export const createDailyXLSX = async (data, user) => {
    try {
        const workbook = new Excel4node.Workbook()
        const firstChangeSheet = workbook.addWorksheet('I ZMIANA'),
            secondChangeSheet = workbook.addWorksheet('II ZMIANA'),
            thirdChangeSheet = workbook.addWorksheet('III ZMIANA');


        //TODO: pomyśleć jak zmienić dodawanie nagłówka (zle to wyglada)
        firstChangeSheet.cell(1, 1).string('Maszyna').style(style)
        firstChangeSheet.cell(1, 2).string('Status').style(style)
        firstChangeSheet.cell(1, 3).string('Czas').style(style)
        firstChangeSheet.cell(1, 4).string('%').style(style)
        secondChangeSheet.cell(1, 1).string('Maszyna').style(style)
        secondChangeSheet.cell(1, 2).string('Status').style(style)
        secondChangeSheet.cell(1, 3).string('Czas').style(style)
        secondChangeSheet.cell(1, 4).string('%').style(style)
        thirdChangeSheet.cell(1, 1).string('Maszyna').style(style)
        thirdChangeSheet.cell(1, 2).string('Status').style(style)
        thirdChangeSheet.cell(1, 3).string('Czas').style(style)
        thirdChangeSheet.cell(1, 4).string('%').style(style)
        let tempCellNumberA = 2,
            tempCellNumberB = 2,
            tempCellNumberC = 2;
        for (let i = 0; i < data.length; i++) {
            tempCellNumberA = await addToCell('daily', data[i].data[0], firstChangeSheet, data[i].name, tempCellNumberA)
            tempCellNumberB = await addToCell('daily', data[i].data[1], secondChangeSheet, data[i].name, tempCellNumberB)
            tempCellNumberC = await addToCell('daily', data[i].data[2], thirdChangeSheet, data[i].name, tempCellNumberC)

        }
        workbook.write(`${path.resolve()}\\Files\\STATYSTYKI_CODZIENNE_${user}.XLSX`);
    } catch (error) {
        console.log(error)
    }

}

export const createMonthlyXLSX = async (data, user) => {
    try {
        const workbook = new Excel4node.Workbook()
        const sheet = workbook.addWorksheet('PODSUMOWANIE');
        sheet.cell(1, 1).string('Maszyna').style(style)
        sheet.cell(1, 2).string('Status').style(style)
        sheet.cell(1, 3).string('Czas').style(style)
        sheet.cell(1, 4).string('Średni czas/doba').style(style)
        sheet.cell(1, 5).string('%').style(style)
        let tempCellNumber = 2;
        // console.log(data)
        for (let i = 0; i < data.length; i++) {
            tempCellNumber = await addToCell('monthly', data[i].data, sheet, data[i].name, tempCellNumber)
        }
        workbook.write(`${path.resolve()}\\Files\\STATYSTYKI_MIESIECZNE_${user}.XLSX`);


    } catch (error) {

    }
}