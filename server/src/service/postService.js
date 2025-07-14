import Post from '../models/postModel/postModel.js';
import User from '../models/userModel.js';

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

export const getFeedService = async () => {

    try {
        const feeds = await Post.find();

        const updatedFeeds = await Promise.all(
            feeds.map(async (feed) => {
                const user = await User.findById(feed.userId).select('userName');
                const feedObj = feed.toObject(); // convert Mongoose document to plain object
                feedObj.userName = user?.userName || "Unknown";
                return feedObj;
            })
        );

        return { status: 200, message: 'Feed received successfully', data: updatedFeeds };
    }
    catch(err) {
        return { status: 500, message: err.message };
    }
}