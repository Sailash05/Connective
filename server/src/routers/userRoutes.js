import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';

import { getProfilePicture, getConnectionStats, addFollower, unFollow } from '../controllers/userController.js';

const router = express.Router();

router.use(verifyToken);

router.get('/profilepicture', getProfilePicture);

router.get('/connection/stats', getConnectionStats);
router.post('/connection/follow/:userId', addFollower);
router.delete('/connection/follow/:userId', unFollow);

export default router;