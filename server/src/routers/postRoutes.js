import express from 'express';

import { verifyToken } from '../middleware/authMiddleware.js';
import { createPost, getFeed } from '../controllers/postController.js';

import { postUpload } from '../middleware/fileUploads.js';

const router = express.Router();

router.use(verifyToken);

router.post('/', postUpload.array('media', 10), createPost);
router.get('/', getFeed);

export default router;