import { response } from "../utils/response.js";
import { createPostService, updatePostService, deletePostService, getFeedService, getSavedPostService, getPostListService, getPostService, likePostService, getCommentService, commentPostService, deleteCommentService, likeCommentSevice, getReplyService, replyPostService, deleteReplyService, likeReplySevice, savePostService, tempService } from "../service/postService.js";

export const createPost = async (req, res) => {

    const fileData = req.files.map(file => ({
        originalName: file.originalname,
        type: file.mimetype.startsWith('video') ? 'video' : 'image',
        url: file.path,
        public_id: file.filename,
    }));
    
    try {
        const result = await createPostService(req.user.userId, req.body, fileData);

        if(result.status === 201) {
            return res.status(201).send(response('SUCCESS', result.message, null));
        }
        else {
            return res.status(result.status).send(response('FAILED', result.message, null));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}

export const updatePost = async (req, res) => {
    const userId = req.user.userId;
    const { postId } = req.query;
    const fileData = req.files.map(file => ({
        originalName: file.originalname,
        type: file.mimetype.startsWith('video') ? 'video' : 'image',
        url: file.path,
        public_id: file.filename,
    }));

    try{
        const result = await updatePostService(userId, postId, req.body, fileData);
        if(result.status === 200) {
            return res.status(201).send(response('SUCCESS', result.message, null));
        }
        else {
            return res.status(result.status).send(response('FAILED', result.message, null));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}

export const deletePost = async (req, res) => {
    const { postId } = req.query;

    try {
        const result = await deletePostService(postId);
        if(result.status === 200) {
            return res.status(200).send(response('SUCCESS', result.message, null));
        }
        else {
            return res.status(result.status).send(response('FAILED', result.message, null));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}

export const getFeed = async (req, res) => {

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    if (isNaN(page) || isNaN(limit)) {
        return res.status(400).json(response('SUCESS', 'Invalid page or limit.', null));
    }

    try {
        const result = await getFeedService(req.user.userId, page, limit);
        if(result.status === 200) {
            return res.status(200).send(response('SUCCESS', result.message, {
                posts: result.data,
                currentPage: result.currentPage,
                totalPages: result.totalPages
            }));
        }
        if (result.status === 500) {
            return res.status(500).send(response('FAILED', result.message, null));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}

export const getSavedPost = async (req, res) => {
    const userId = req.user.userId;
    try {
        const result = await getSavedPostService(userId);
        if(result.status === 200) {
            return res.status(200).send(response('SUCCESS', result.message, result.postList));
        }
        else {
            return res.status(result.status).send(response('FAILED', result.message, null));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}

export const getPostList = async (req, res) => {
    const { userId } = req.query;
    try {
        const result = await getPostListService(userId);
        if(result.status === 200) {
            return res.status(200).send(response('SUCCESS', result.message, result.data));
        }
        else {
            return res.status(result.status).send(response('FAILED', result.message, null));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}

export const getPost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.userId;
    try {
        const result = await getPostService(postId, userId);
        if(result.status === 404) {
            return res.status(404).send(response('FAILED', result.message, null));
        }
        if (result.status === 500) {
            return res.status(500).send(response('FAILED', result.message, null));
        }
        return res.status(200).send(response('SUCCESS', result.message, result.data));
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}

export const likePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.userId;

    try {
        const result = await likePostService(userId, postId, true);
        
        if(result.status === 200) {
            return res.status(200).send(response('SUCCESS', result.message, result.data));
        }
        else if(result.status === 404) {
            return res.status(404).send(response('FAILED', result.message, null));
        }
        if (result.status === 500) {
            return res.status(500).send(response('FAILED', result.message, null));
        }
    } 
    catch (err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
};

export const unlikePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.userId;

    try {
        const result = await likePostService(userId, postId, false);

        if(result.status === 200) {
            return res.status(200).send(response('SUCCESS', result.message, result.data));
        }
        else if(result.status === 404) {
            return res.status(404).send(response('FAILED', result.message, null));
        }
        if (result.status === 500) {
            return res.status(500).send(response('FAILED', result.message, null));
        }
    } 
    catch (err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
};

export const getComment = async (req, res) => {
    const userId = req.user.userId;
    const { postId } = req.params;
    const { filter, page, limit } = req.query;
    try {
        const result = await getCommentService(userId, postId, filter, page, Number(limit));
        if(result.status === 200) {
            return res.status(200).send(response('SUCCESS', result.message, { comments: result.data }));
        }
        else if(result.status === 400 || result.status === 500) {
            return res.status(result.status).send(response('FAILED', result.message, null));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}
export const postComment = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.userId;
    const { text } = req.body;
    try {
        const result = await commentPostService(userId, postId, text);

        if(result.status === 404) {
            return res.status(404).send(response('FAILED', result.message, null));
        }
        if (result.status === 500) {
            return res.status(500).send(response('FAILED', result.message, null));
        }

        return res.status(201).send(response('SUCCESS', result.message, null));
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}
export const deleteComment = async (req, res) => {
    const userId = req.user.userId;
    const { commentId } = req.params;
    try {
        const result = await deleteCommentService(userId, commentId);
        if(result.status === 404 || result.status === 500) {
            return res.status(result.status).send(response('FAILED', err.message, null));
        }
        return res.status(200).send(response('SUCCESS', result.message, null));
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}

export const likeComment = async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user.userId; 

    try {
        const result = await likeCommentSevice(userId, commentId, true);

        if(result.status === 404) {
            return res.status(404).send(response('FAILED', result.message, null));
        }
        if (result.status === 500) {
            return res.status(500).send(response('FAILED', result.message, null));
        }
        return res.status(200).send(response('SUCCESS', result.message, null));
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}
export const unLikeComment = async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user.userId;

    try {
        const result = await likeCommentSevice(userId, commentId, false);

        if(result.status === 404) {
            return res.status(404).send(response('FAILED', result.message, null));
        }
        if (result.status === 500) {
            return res.status(500).send(response('FAILED', result.message, null));
        }
        return res.status(200).send(response('SUCCESS', result.message, null));
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}

// getReply, postReply, likeReply, unLikeReply
export const getReply = async (req, res) => {
    const userId = req.user.userId;
    const { commentId } = req.params;
    const { filter, page, limit } = req.query;
    try {
        const result = await getReplyService(userId, commentId, filter, page, Number(limit));
        if(result.status === 200) {
            return res.status(200).send(response('SUCCESS', result.message, { comments: result.data }));
        }
        else if(result.status === 400 || result.status === 500) {
            return res.status(result.status).send(response('FAILED', result.message, null));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}
export const postReply = async (req, res) => {
    const { postId, commentId } = req.params;
    const userId = req.user.userId;
    const { text } = req.body;
    try {
        const result = await replyPostService(userId, postId, commentId, text);

        if(result.status === 404) {
            return res.status(404).send(response('FAILED', result.message, null));
        }
        if (result.status === 500) {
            return res.status(500).send(response('FAILED', result.message, null));
        }

        return res.status(201).send(response('SUCCESS', result.message, null));
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}
export const deleteReply = async (req, res) => {
    const userId = req.user.userId;
    const { replyId } = req.params;
    try {
        const result = await deleteReplyService(userId, replyId);
        if(result.status === 404 || result.status === 500) {
            return res.status(result.status).send(response('FAILED', err.message, null));
        }
        return res.status(200).send(response('SUCCESS', result.message, null));
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}
export const likeReply = async (req, res) => {
    const { replyId } = req.params;
    const userId = req.user.userId; 

    try {
        const result = await likeReplySevice(userId, replyId, true);

        if(result.status === 404) {
            return res.status(404).send(response('FAILED', result.message, null));
        }
        if (result.status === 500) {
            return res.status(500).send(response('FAILED', result.message, null));
        }
        return res.status(200).send(response('SUCCESS', result.message, null));
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}
export const unLikeReply = async (req, res) => {
    const { replyId } = req.params;
    const userId = req.user.userId; 

    try {
        const result = await likeReplySevice(userId, replyId, false);

        if(result.status === 404) {
            return res.status(404).send(response('FAILED', result.message, null));
        }
        if (result.status === 500) {
            return res.status(500).send(response('FAILED', result.message, null));
        }
        return res.status(200).send(response('SUCCESS', result.message, null));
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}


export const savePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.userId;

    try {
        const result = await savePostService(userId, postId, true);
         if(result.status === 200) {
            return res.status(200).send(response('SUCCESS', result.message, null));
        }
        else if(result.status === 404) {
            return res.status(404).send(response('FAILED', result.message, null));
        }
        if (result.status === 500) {
            return res.status(500).send(response('FAILED', result.message, null));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}

export const unSavePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.userId;

    try {
        const result = await savePostService(userId, postId, false);
        if(result.status === 200) {
            return res.status(200).send(response('SUCCESS', result.message, null));
        }
        else if(result.status === 404) {
            return res.status(404).send(response('FAILED', result.message, null));
        }
        if (result.status === 500) {
            return res.status(500).send(response('FAILED', result.message, null));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}


export const temp = async (req, res) => {
    const post = await tempService();
    return res.status(200).send(response('SUCCESS', 'temp', post));
}