import express from 'express';
import DashboardController from './DashboardController.mjs';
const router = express.Router();
router.get('/settings', DashboardController.getSettings)
router.get('/settings/user', DashboardController.getUserSettings)
router.post('/settings/user/set', DashboardController.setUserSettings)

export default router;