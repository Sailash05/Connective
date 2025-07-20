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

export const getFeedService = async (userId) => {

    const currentUser = await User.findById(userId).exec();

    try {
        const feeds = await Post.find();

        const updatedFeeds = await Promise.all(
            feeds.map(async (feed) => {
                const user = await User.findById(feed.userId).select('userName profilePicture');
                const feedObj = feed.toObject(); // convert Mongoose document to plain object
                feedObj.userName = user?.userName || "Unknown";
                feedObj.profilePicture = user?.profilePicture || 'https://res.cloudinary.com/djbmyn0fw/image/upload/v1752897230/default-profile_n6tn9o.jpg';
                feedObj.isPostSaved = currentUser?.savedPost.includes(feed._id);
                return feedObj;
            })
        );

        return { status: 200, message: 'Feed received successfully', data: updatedFeeds };
    }
    catch(err) {
        return { status: 500, message: err.message };
    }
}

export const getPostService = async (postId) => {
    try {
        const post = await Post.findById(postId).exec();
        if(!post) {
            return { status: 404, message: 'Post not found.' };
        }

        const user = await User.findById(post.userId).select('userName profilePicture');
        const postObj = post.toObject();
        postObj.userName = user?.userName || "Unknown";
        postObj.profilePicture = user?.profilePicture || 'https://res.cloudinary.com/djbmyn0fw/image/upload/v1752897230/default-profile_n6tn9o.jpg';
        return { statsu: 200, message: 'Get your post.', data: { post: postObj } };
    }
    catch(err) {
        return { status: 500, message: err.message };
    }
}

export const likePostService = async (userId, postId, isLike) => {
    try {
        const update = isLike 
            ? { $addToSet: { likes: userId } }
            : { $pull: { likes: userId } };

        const post = await Post.findByIdAndUpdate(postId, update, { new: true });

        if (!post) {
            return { status: 404, message: 'Post not found.' };
        }

        return {
            status: 200,
            message: `Post ${isLike ? 'liked' : 'unliked'} successfully`,
            data: { likeCount: post.likes.length }
        };
    }
    catch (err) {
        return { status: 500, message: err.message };
    }
};


export const savePostService = async (userId, postId, isSave) => {
    try {
        const update = isSave 
            ? { $addToSet: { savedPost: postId } }
            : { $pull: { savedPost: postId } };

        const user = await User.findByIdAndUpdate(userId, update, { new: true });

        if (!user) {
            return { status: 404, message: 'User not found.' };
        }

        return { status: 200, message: `Post ${isSave ? 'saved' : 'unsaved'} successfully` };
    } 
    catch (err) {
        return { status: 500, message: err.message };
    }
}