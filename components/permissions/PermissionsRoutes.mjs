import express from 'express';
import {
    getMenuItems,
    getPage
} from './PermissionsController.mjs';
import {
    jwtAuth
} from '../../middleware/auth.mjs'

const router = express.Router();
router.get('/menu', jwtAuth, getMenuItems)
router.post('/page', jwtAuth, getPage)

export default router;