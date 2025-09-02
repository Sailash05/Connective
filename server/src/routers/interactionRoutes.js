import express from 'express';
import { postInteraction } from '../service/interactionService/postInteractionService.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/post/:postId/share', verifyToken, async (req, res) => {
    try {
        await postInteraction(req.user.userId, req.params.postId, 'SHARED');
        return res.status(200).json({ status: 'SUCCESS', message: 'Post shared' });
    }
    catch(err) {
        return res.status(500).json({ status: 'SUCCESS', message: err.message });
    }
})

export default router;