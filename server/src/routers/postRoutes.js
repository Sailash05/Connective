import express from 'express';

import { verifyToken } from '../middleware/authMiddleware.js';
import { createPost, getFeed, getPost, likePost, unlikePost, savePost, unSavePost } from '../controllers/postController.js';

import { postUpload } from '../middleware/fileUploads.js';

const router = express.Router();

router.use(verifyToken);

router.post('/', postUpload.array('media', 10), createPost);
router.get('/', getFeed);
router.get('/:postId', getPost);

router.post('/:postId/like', likePost);
router.delete('/:postId/like', unlikePost);

router.post('/:postId/save', savePost);
router.delete('/:postId/save', unSavePost);

export default router;