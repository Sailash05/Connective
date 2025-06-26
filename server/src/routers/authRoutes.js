import express from 'express';
const router = express.Router();

import { validateCreateUser, validateLoginInput } from '../middleware/authMiddleware.js';
import { createUser, loginUser, deleteUser } from '../controllers/authController.js';

router.post('/createuser', validateCreateUser, createUser);
router.post('/loginuser', validateLoginInput, loginUser);
// router.put('/updateuser', );
router.delete('/deleteuser', deleteUser);

export default router;