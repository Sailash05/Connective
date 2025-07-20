import { response } from "../utils/response.js";
import { createPostService, getFeedService, getPostService, likePostService, savePostService } from "../service/postService.js";

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
            return res.status(500).send(response('FAILED', result.message, null));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}

export const getFeed = async (req, res) => {

    try {
        const result = await getFeedService(req.user.userId);
        if(result.status === 200) {
            return res.status(200).send(response('SUCCESS', result.message, result.data));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}

export const getPost = async (req, res) => {
    const { postId } = req.params;
    try {
        const result = await getPostService(postId);
        if(result.status === 404) {
            return res.status(404).send(response('FAILED', result.message, null));
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
    } 
    catch (err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
};


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
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}