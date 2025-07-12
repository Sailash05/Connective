import { response } from "../utils/response.js";
import { createPostService } from "../service/postService.js";

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