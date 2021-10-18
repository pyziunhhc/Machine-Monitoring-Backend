// const express from 'express'), jwtAuth,
//     api = express();
import express from 'express';
// import api from '../controllers/components/auth/AuthRoutes.mjs'
import SummaryDataController from './controllers/SummaryDataController.mjs';
import DygraphDataController from './controllers/DygraphController.mjs';
import ChartJSDataController from './controllers/ChartJSController.mjs';
import AllDataController from './controllers/AllDataController.mjs';
import StatusController from './controllers/StatusController.mjs'
import {
    catchAsync
} from '../../middleware/error.mjs';
import {
    jwtAuth
} from '../../middleware/auth.mjs';
const api = express.Router();
api.get('/summary/:name', jwtAuth, catchAsync(SummaryDataController.get))
api.put('/summary', jwtAuth, catchAsync(SummaryDataController.update))
api.get('/dygraph/:name', jwtAuth, catchAsync(DygraphDataController.dygraph))
api.put('/dygraph', jwtAuth, catchAsync(DygraphDataController.update))
api.get('/chartJS/:name', jwtAuth, catchAsync(ChartJSDataController.get))
api.put('/chartJS', jwtAuth, catchAsync(ChartJSDataController.update))
api.get('/all/:name', jwtAuth, catchAsync(AllDataController.get))
api.put('/all', jwtAuth, catchAsync(AllDataController.update))
api.get('/status/:name', jwtAuth, catchAsync(StatusController.get))
api.put('/status', jwtAuth, catchAsync(StatusController.update));
api.post('/clear', jwtAuth, AllDataController.clearDataInSession)

export default api;