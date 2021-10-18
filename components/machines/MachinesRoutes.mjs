import express from 'express';
import MachinesController from './MachinesController.mjs';
import {
    jwtAuth
} from '../../middleware/auth.mjs';
const router = express.Router();

router.get('/', jwtAuth, MachinesController.get)
router.get('/user', jwtAuth, MachinesController.getByUser)
router.get('/access/:machineName/users', jwtAuth, MachinesController.getMachinesByUser);
router.put('/', jwtAuth, MachinesController.update);
router.put('/access/:machineName/users', jwtAuth, MachinesController.updateMachinesByUser);
router.delete('/access/:machineName/users/:login', jwtAuth, MachinesController.deleteMachinesByUser);
router.get('/check/:machineName', jwtAuth, MachinesController.checkMachineIsLockedByUser);
router.post('/lock', jwtAuth, MachinesController.lockMachine);
router.post('/unlock', jwtAuth, MachinesController.unlockMachine);
router.get('/locked', jwtAuth, MachinesController.lockedMachines);
router.get('/feed/', jwtAuth, MachinesController.getMachinesFeed);
router.get('/feed/:machineName/:from/:to', jwtAuth, MachinesController.getMachinesFeed);
export default router;