import express from 'express';
const router = express.Router();

import { validateCreateUser, validateLoginInput, validateForOtp, validateForUpdatePassword, verifyToken } from '../middleware/authMiddleware.js';
import { createUser, loginUser, getOtp, resetRequest, verifyTokenController, deleteUser, updatePassword } from '../controllers/authController.js';

router.post('/createuser', validateCreateUser, createUser);
router.post('/loginuser', validateLoginInput, loginUser);
router.post('/getotp', validateForOtp, getOtp);
router.post('/resetrequest', validateForOtp, resetRequest);
router.put('/update-password', validateForUpdatePassword, updatePassword);
router.get('/verifytoken', verifyToken, verifyTokenController);
router.delete('/deleteuser', verifyToken, deleteUser);

export default router;