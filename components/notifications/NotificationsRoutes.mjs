import express from 'express';
import {
    get,
    update
} from './NotificationsController.mjs';
const router = express.Router();

router.get('/', get)
router.put('/', update)

export default router;