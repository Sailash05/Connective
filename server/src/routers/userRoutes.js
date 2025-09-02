import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';

import { getProfilePicture, getUsers, getConnectionStats, addFollower, unFollow, getUserProfileList } from '../controllers/userController.js';

const router = express.Router();

router.use(verifyToken);

router.get('/profilepicture', getProfilePicture);

router.get('/get-user-list', getUsers)

router.get('/connection/stats', getConnectionStats);
router.post('/connection/follow/:userId', addFollower);
router.delete('/connection/follow/:userId', unFollow);

router.get('/connection/get-userprofile-list', getUserProfileList);

export default router;