import express from 'express';
import {
    jwtAuth
} from '../../middleware/auth.mjs';;
import {
    getAccessedUsersToMachines,
    getMachinesByUser,
    updateMachinesByUser,
    deleteMachinesByUser,
    getSenderTime,
    setSenderTime,
    setEmailAccount,
    sendPerformanceReport
} from './SenderController.mjs';
const router = express.Router();

router.get('/access/users', jwtAuth, getAccessedUsersToMachines)
router.get('/access/:machineName/users/:senderType', jwtAuth, getMachinesByUser)
router.put('/access/:machineName/users/:senderType', jwtAuth, updateMachinesByUser)
router.delete('/access/:machineName/users/:login/:senderType', jwtAuth, deleteMachinesByUser)
router.get('/configuration/time', jwtAuth, getSenderTime)
router.post('/configuration/time', jwtAuth, setSenderTime)
router.post('/configuration/email', jwtAuth, setEmailAccount)
router.post('/send/performance/:senderType', sendPerformanceReport)
// router.put('/time', jwtAuth, updateSenderTime)
export default router;