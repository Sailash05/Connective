import express from 'express';
const router = express.Router();

import { validateCreateUser, validateLoginInput, verifyToken } from '../middleware/authMiddleware.js';
import { createUser, loginUser, deleteUser, verifyTokenController } from '../controllers/authController.js';

router.post('/createuser', validateCreateUser, createUser);
router.post('/loginuser', validateLoginInput, loginUser);
router.get('/verifytoken', verifyToken, verifyTokenController);
router.delete('/deleteuser', verifyToken, deleteUser);

export default router;