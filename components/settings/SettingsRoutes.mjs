import express from 'express';
import {
    jwtAuth
} from '../../middleware/auth.mjs';
import {
    get,
    getUsers
} from './SettingsController.mjs'
const router = express.Router()

router.get('/', jwtAuth, get)
router.get('/user', jwtAuth, getUsers)
export default router;