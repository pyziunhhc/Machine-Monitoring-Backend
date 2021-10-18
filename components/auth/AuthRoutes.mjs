import express from 'express';
import passport from 'passport'
import {
    login,
    check,
    logout,
    destroy
} from "./AuthController.mjs"
import {
    catchAsync
}
from '../../middleware/error.mjs'

import {
    jwtAuth
} from '../../middleware/auth.mjs';
const router = express();
const loginUser = (req, res, next) => {
    passport.authenticate('local', {
        session: false
    }, (error, user, info) => {
        if (!error) {
            if (user) {
                req.user = user;
                next()
            } else {
                return next(info)
            }
        } else {
            return next(error)
        }
    })(req, res, next)
}
router.post('/login', loginUser, catchAsync(login));
router.get('/check', jwtAuth, check);
router.post('/logout', jwtAuth, logout);
router.post('/session/destroy', destroy);


export default router;