import express from 'express';
const router = express.Router();

import { validateCreateUser } from '../middleware/authMiddleware.js';
import { createUser, deleteUser } from '../controllers/authController.js';

router.post('/createuser', validateCreateUser, createUser);
router.delete('/deleteuser', deleteUser);

export default router;