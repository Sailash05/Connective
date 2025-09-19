import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';

import { getProfilePicture, getProfile, updateProfile, updateProfilePicture, updateBannerPicture, getOverview, getUsers, getConnectionStats, addFollower, unFollow, getUserProfileList } from '../controllers/userController.js';
import { profilePictureUpload, bannerPictureUpload } from '../middleware/fileUploads.js';

const router = express.Router();

router.use(verifyToken);

router.get('/profilepicture', getProfilePicture);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/profile-picture', profilePictureUpload.single('profilePicture'), updateProfilePicture);
router.put('/banner-picture', bannerPictureUpload.single('bannerPicture'), updateBannerPicture);

router.get('/overview', getOverview);
router.get('/get-user-list', getUsers);

router.get('/connection/stats', getConnectionStats);
router.post('/connection/follow/:userId', addFollower);
router.delete('/connection/follow/:userId', unFollow);

router.get('/connection/get-userprofile-list', getUserProfileList);

export default router;