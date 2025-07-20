import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';

import { getProfilePicture } from '../controllers/userController.js';

const router = express.Router();

router.use(verifyToken);

router.get('/profilepicture', getProfilePicture);


export default router;