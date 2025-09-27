import express from 'express';

import { verifyToken } from '../middleware/authMiddleware.js';
import { createPost, updatePost, deletePost, getFeed, getSavedPost, getPostList, getPost, likePost, unlikePost, getComment, postComment, deleteComment, likeComment, unLikeComment, getReply, postReply, deleteReply, likeReply, unLikeReply, savePost, unSavePost, temp } from '../controllers/postController.js';

import { postUpload } from '../middleware/fileUploads.js';

const router = express.Router();

router.use(verifyToken);

router.post('/', postUpload.array('media', 10), createPost);
router.put('/', postUpload.array('newMedia', 10), updatePost);
router.delete('/', deletePost);

router.get('/', getFeed);
router.get('/temp', temp);
router.get('/saved-post', getSavedPost);
router.get('/post-list', getPostList);
router.get('/:postId', getPost);

router.post('/:postId/like', likePost);
router.delete('/:postId/like', unlikePost);

// COMMENTS
router.get('/:postId/comment', getComment);
router.post('/:postId/comment', postComment);
router.delete('/:commentId/delete-comment', deleteComment);
router.post('/:commentId/comment/like', likeComment);
router.delete('/:commentId/comment/like', unLikeComment);

// REPLIES
router.get('/:commentId/reply', getReply);
router.post('/:postId/:commentId/reply', postReply);
router.delete('/:replyId/delete-reply', deleteReply);
router.post('/:replyId/reply/like', likeReply);
router.delete('/:replyId/reply/like', unLikeReply);

router.post('/:postId/save', savePost);
router.delete('/:postId/save', unSavePost);



export default router;