// import express from 'express';

// import {
//     authUser
// } from '../helpers/authUser.mjs';
// import Users from '../models/Users.mjs';
// import Email from '../models/Email.mjs';
// import {
//     getStatuses,
//     getMachines,
//     getGroups
// }
// from '../helpers/fetchFromMainApp.mjs';
// import {
//     prepareSummaryData
// } from '../helpers/processStatuses/process.mjs';
// import parseMillisecondsIntoReadableTime from '../helpers/helpers.mjs';
// import {
//     get
// } from './ReportsController.mjs'
// const router = express.Router();
// router.get('/data/get/summary', )
// router.get('/mail', (req, res, next) => {
//     const cookie = authUser(req.cookies);
//     cookie.then(auth => {
//         if (auth) {
//             res.render('mail', {
//                 title: 'Raporty mailowe | ITA Tools Sp. z o.o',
//                 jsfiles: '/Reports/Mail/controller.js',
//                 cssfiles: 'mail',
//                 login: req.cookies.login
//             })
//         }
//     }).catch(error => {
//         console.log(error)
//         res.redirect('/login')
//     })

// })

// router.get('/mail/users', (req, res, next) => {
//     getUsers()
//         .then(users => {
//             checkAvailable(users)
//                 .then(data => {
//                     res.send({
//                         status: 200,
//                         data: data
//                     })
//                 })
//         })
// })


// router.put('/mail/users/update', (req, res, next) => {
//     const user = req.body.user,
//         daily = req.body.daily,
//         monthly = req.body.monthly;
//     Email.findOne({
//         user: user.user,
//     }, (error, document) => {
//         if (error) {

//         } else if (document) {
//             Email.findOneAndUpdate({
//                 user: document.user
//             }, {
//                 daily: daily,
//                 monthly: monthly
//             }, (error, document) => {
//                 console.log(error, document)
//             })
//         } else {
//             const newUser = new Email({
//                 user: user.user,
//                 userID: user.userID,
//                 email: user.email,
//                 daily: daily,
//                 monthly: monthly
//             })
//             newUser.save((error, document) => {
//                 console.log(error, document)
//             })
//         }
//     })
// })


// function getUsers() {
//     return new Promise((resolve, reject) => {
//         Users.find((error, users) => {
//             if (users.length) {
//                 resolve(users)
//             }
//             if (error) {
//                 reject(error)
//             }
//         })
//     })
// }

// function checkAdded(user) {
//     return new Promise((resolve, reject) => {
//         Email.findOne({
//             user: user.login,
//             email: user.email,
//         }, (error, document) => {
//             if (error) {
//                 reject(error)
//             }

//             if (document) {
//                 if (document.monthly && document.daily) {
//                     resolve({
//                         user: document,
//                         available: false,
//                         monthly: true,
//                         daily: true
//                     })
//                 }
//                 if (document.daily && !document.monthly) {
//                     resolve({
//                         user: document,
//                         available: true,
//                         daily: true,
//                         monthly: false
//                     })
//                 }
//                 if (document.monthly && !document.daily) {
//                     resolve({
//                         user: document,
//                         available: true,
//                         daily: false,
//                         monthly: true
//                     })
//                 }
//                 if (!document.monthly && !document.daily) {
//                     resolve({
//                         user: document,
//                         available: true,
//                         daily: false,
//                         monthly: false
//                     })
//                 }
//             } else {
//                 resolve({
//                     user: {
//                         userID: user._id,
//                         user: user.login,
//                         email: user.email
//                     },
//                     available: true
//                 })
//             }
//         })
//     })
// }

// function checkAvailable(users) {
//     return new Promise((resolve, reject) => {
//         let daily = [],
//             monthly = [],
//             available = [];
//         users.forEach((user, index) => {
//             checkAdded(user)
//                 .then(res => {
//                     if (res.daily) {
//                         daily.push(res.user)
//                     }
//                     if (res.monthly) {
//                         monthly.push(res.user)
//                     }
//                     if (res.available) {
//                         available.push(res.user)
//                     }

//                     if (users.length - 1 == index) {
//                         //console.log('Dzienny', daily, 'Miesieczny', monthly, 'Dostepni', available)
//                         resolve({
//                             daily: daily,
//                             monthly: monthly,
//                             available: available
//                         })
//                     }
//                 })

//         })
//     })
// }
// export default router;