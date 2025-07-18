import express from 'express';
import passport from 'passport';
const router = express.Router();

import { validateCreateUser, validateLoginInput, validateForOtp, validateForUpdatePassword, verifyToken } from '../middleware/authMiddleware.js';
import { createUser, loginUser, getOtp, resetRequest, verifyTokenController, updatePassword, deleteUser, oauthCallback } from '../controllers/authController.js';

router.post('/createuser', validateCreateUser, createUser);
router.post('/loginuser', validateLoginInput, loginUser);
router.post('/getotp', validateForOtp, getOtp);
router.post('/resetrequest', validateForOtp, resetRequest);
router.put('/update-password', validateForUpdatePassword, updatePassword);
router.get('/verifytoken', verifyToken, verifyTokenController);
router.delete('/deleteuser', verifyToken, deleteUser);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}/auth?error=oauth_failed`, session: false }), oauthCallback);

router.get('/github', passport.authenticate('github', { scope: ['user:email'], session: false }));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: `${process.env.FRONTEND_URL}/auth?error=oauth_failed`, session: false }), oauthCallback);

export default router;