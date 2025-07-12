import Post from '../models/postModel/postModel.js';

export const createPostService = async (userId, { content, tags, visibility }, fileData) => {
    
    tags = tags.split(",").map(word => word.trim().toLowerCase()).filter(word => word.length > 0);

    try {
        await Post.create({
            userId: userId,
            content: content,
            fileData: fileData,
            tags: tags,
            visibility: visibility.toUpperCase(),
            postedAt: new Date()
        });
        return { status: 201, message: 'Posted successfully' };
    }
    catch(err) {
        return { status: 500, message: err.message };
    }
}