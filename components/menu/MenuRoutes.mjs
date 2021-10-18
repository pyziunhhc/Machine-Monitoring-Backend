import express from 'express';
import {
    jwtAuth
} from '../../middleware/auth.mjs'
import MenuController from './MenuController.mjs'
const router = express.Router();
router.get('/menu', jwtAuth, MenuController.getMenu)
router.get('/settings', jwtAuth, MenuController.getSettings)
// router.get('/server', (req, res, next) => {
//     Server.find((err, document) => {
//         if (document.length) {
//             res.send({
//                 status: 200,
//                 config: document
//             })
//         } else {
//             res.send({
//                 status: 500,
//                 message: ['Brak danych nt. serwera']
//             })
//         }
//     })
// })
// router.post('/server/save', (req, res, next) => {
//     const {
//         ip,
//         port,
//         apiVersion,
//         login,
//         password,
//         testMode
//     } = req.body;
//     Server.find((err, document) => {
//         if (!document.length) {
//             const server = new Server({
//                 ip,
//                 port,
//                 apiVersion,
//                 login,
//                 password,
//                 testMode
//             })
//             server.save(error => {
//                 if (!error) {
//                     res.send({
//                         status: 200,
//                         message: ['Pomyślnie zapisano ustawienia serwera']
//                     })
//                 }
//             })
//         } else {
//             Server.findOneAndUpdate({}, {
//                 ip,
//                 port,
//                 apiVersion,
//                 login,
//                 password,
//                 testMode
//             }, (err, document) => {

//             })
//         }
//     })

// })

export default router;