import Post from '../models/postModel/postModel.js';
import User from '../models/userModel.js';
import Comment from '../models/postModel/commentModel.js';
import mongoose from 'mongoose';
import PostInteraction from '../models/interaction/postInteractionModel.js';
import { postInteraction } from './interactionService/postInteractionService.js';
import axios from "axios";

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

export const getFeedService = async (userId, page = 1, limit = 10) => {
    try {
        const skip = (page - 1) * limit;

        const interactions = await PostInteraction.find({ userId }).lean();
        const currentUser = await User.findById(userId)
            .select("savedPost")
            .lean();
        const savedPosts = currentUser?.savedPost || [];

        // --- CASE 1: New user (no interactions) ---
        if (!interactions || interactions.length === 0 || true) {
            const totalPosts = await Post.countDocuments(); // For pagination metadata

            const feeds = await Post.aggregate([
                { $sort: { createdAt: -1 } },
                { $skip: skip },                 // Pagination
                { $limit: limit },               // Pagination

                // Lookup post owner info
                {
                    $lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "userInfo"
                    }
                },
                { $unwind: "$userInfo" },

                // Count comments (only top-level)
                {
                    $lookup: {
                        from: "comments",
                        let: { postId: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$postId", "$$postId"] },
                                            { $eq: ["$parentCommentId", null] }
                                        ]
                                    }
                                }
                            },
                            { $count: "count" }
                        ],
                        as: "commentData"
                    }
                },
                {
                    $addFields: {
                        noOfComments: {
                            $ifNull: [{ $arrayElemAt: ["$commentData.count", 0] }, 0]
                        }
                    }
                },
                { $project: { commentData: 0 } },

                // Count likes + user info
                {
                    $addFields: {
                        noOfLikes: { $size: "$likes" },
                        userName: "$userInfo.userName",
                        profilePicture: {
                            $ifNull: [
                                "$userInfo.profilePicture",
                                "https://res.cloudinary.com/djbmyn0fw/image/upload/v1752897230/default-profile_n6tn9o.jpg"
                            ]
                        }
                    }
                },
                { $project: { userInfo: 0 } }
            ]);

            const updatedFeeds = feeds.map(feed => {
                const feedId = feed._id.toString();
                return {
                    ...feed,
                    isPostSaved: savedPosts.some(id => id.toString() === feedId),
                    isLiked: feed.likes?.some(id => id.toString() === userId.toString()) || false
                };
            }).map(feed => {
                const { likes, ...rest } = feed;
                return rest;
            });

            return {
                status: 200,
                message: "Feed received successfully (new user)",
                totalPosts,         // Total for frontend pagination
                currentPage: page,
                totalPages: Math.ceil(totalPosts / limit),
                data: updatedFeeds
            };
        }

        // --- CASE 2: Returning user (with interactions) ---
        const userRatings = interactions.map(i => ({
            postId: i.postId.toString(),
            rating: i.rating
        }));

        const posts = await Post.find(
            { userId: { $ne: userId } },
            { _id: 1, content: 1, tags: 1 }
        ).lean();

        const formattedPosts = posts.map(p => ({
            postId: p._id.toString(),
            content: p.content || "",
            tags: p.tags || []
        }));

        const feedData = {
            ratings: userRatings,
            posts: formattedPosts
        };

        const { data } = await axios.post(`${process.env.ML_API_URL}/recommend`, feedData);
        const recommendedPostIds = data.recommendations || [];

        if (recommendedPostIds.length === 0) {
            return { status: 200, message: "No recommendations available", data: [] };
        }

        const totalPosts = recommendedPostIds.length;

        const recommendedPosts = await Post.aggregate([
            { $match: { _id: { $in: recommendedPostIds.map(id => new ObjectId(id)) } } },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },

            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userInfo"
                }
            },
            { $unwind: "$userInfo" },
            {
                $lookup: {
                    from: "comments",
                    let: { postId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$postId", "$$postId"] },
                                        { $eq: ["$parentCommentId", null] }
                                    ]
                                }
                            }
                        },
                        { $count: "count" }
                    ],
                    as: "commentData"
                }
            },
            {
                $addFields: {
                    noOfComments: {
                        $ifNull: [{ $arrayElemAt: ["$commentData.count", 0] }, 0]
                    },
                    noOfLikes: { $size: "$likes" },
                    userName: "$userInfo.userName",
                    profilePicture: {
                        $ifNull: [
                            "$userInfo.profilePicture",
                            "https://res.cloudinary.com/djbmyn0fw/image/upload/v1752897230/default-profile_n6tn9o.jpg"
                        ]
                    }
                }
            },
            { $project: { userInfo: 0, commentData: 0 } }
        ]);

        const finalFeeds = recommendedPosts.map(feed => {
            const feedId = feed._id.toString();
            return {
                ...feed,
                isPostSaved: savedPosts.some(id => id.toString() === feedId),
                isLiked: feed.likes?.some(id => id.toString() === userId.toString()) || false
            };
        }).map(feed => {
            const { likes, ...rest } = feed;
            return rest;
        });

        return {
            status: 200,
            message: "Feed received successfully (recommended)",
            totalPosts,
            currentPage: page,
            totalPages: Math.ceil(totalPosts / limit),
            data: finalFeeds
        };

    } catch (err) {
        return { status: 500, message: err.message };
    }
};



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

    await postInteraction(userId, postId, isLike ? 'LIKED' : 'UNLIKED');
    
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
            message: `Post ${isLike ? 'liked' : 'unliked'} successfully.`,
            data: { likeCount: post.likes.length }
        };
    }
    catch (err) {
        return { status: 500, message: err.message };
    }
};

export const getCommentService = async (userId, postId, filter, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    try {
        const sortStage =
            filter === 'recent'
                ? { createdAt: -1 }
                : filter === 'popular'
                ? { likeCount: -1, createdAt: -1 }
                : null;

        if (!sortStage) {
            return { status: 400, message: 'Invalid filter option' };
        }

        const comments = await Comment.aggregate([
            { 
                $match: { 
                    postId: new mongoose.Types.ObjectId(postId), 
                    parentCommentId: null 
                } 
            },

            { $addFields: { likeCount: { $size: "$likes" } } },
            { $sort: sortStage },
            { $skip: skip },
            { $limit: limit },

            // Lookup user info (comment author)
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userInfo"
                }
            },
            { $unwind: "$userInfo" },

            // Count replies for this comment
            {
                $lookup: {
                    from: "comments",
                    let: { parentId: "$_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$parentCommentId", "$$parentId"] } } },
                        { $count: "count" }
                    ],
                    as: "replyData"
                }
            },
            {
                $addFields: {
                    noOfReplies: { $ifNull: [{ $arrayElemAt: ["$replyData.count", 0] }, 0] }
                }
            },

            // Add computed fields
            {
                $addFields: {
                    noOfLikes: "$likeCount",
                    userName: "$userInfo.userName",
                    profilePicture: {
                        $ifNull: [
                            "$userInfo.profilePicture",
                            "https://res.cloudinary.com/djbmyn0fw/image/upload/v1752897230/default-profile_n6tn9o.jpg"
                        ]
                    },
                    // FIX: Compare comment.userId with the API caller's userId
                    isAuthor: { $eq: ["$userId", new mongoose.Types.ObjectId(userId)] },
                    isLiked: { $in: [new mongoose.Types.ObjectId(userId), "$likes"] }
                }
            },

            { 
                $project: { 
                    likes: 0,
                    likeCount: 0,
                    replyData: 0,
                    userInfo: 0
                } 
            }
        ]);

        return { status: 200, message: 'Get the comments', data: comments };
    } catch (err) {
        return { status: 500, message: err.message };
    }
};

export const commentPostService = async (userId, postId, text) => {
    
    await postInteraction(userId, postId, 'COMMENTED');
    try {
        const post = await Post.findById(postId).exec();
        if(!post) {
            return { status: 404, message: 'Post not found.' };
        }
        const comment = await Comment.create({
            text: text,
            postId: postId,
            userId: userId
        });
        await post.save();
        return { status: 201, message: 'Comment added.' };
    }
    catch(err) {
        console.log(err.message)
        return { status: 500, message: err.message };
    }
}

export const deleteCommentService = async (userId, commentId) => {
    try {
        await Comment.deleteMany({ parentCommentId: commentId });
        const comment = await Comment.findOneAndDelete({
            _id: commentId,
            userId: userId,
            parentCommentId: null
        });
        await postInteraction(userId, comment.postId, 'UNCOMMENTED');
        if(!comment) {
            return { status: 404, message: "Comment not found or unauthorized" };
        }
        return { status: 200, message: "Comment deleted successfully" };
    }
    catch(err) {
        return { status: 500, message: err.message };
    }
}

export const likeCommentSevice = async(userId, commentId, isLike) => {
    try {
        const update = isLike 
            ? { $addToSet: { likes: userId } }
            : { $pull: { likes: userId } };

        const comment = await Comment.findByIdAndUpdate(commentId, update, { new: true });

        if(!comment) {
            return { status: 404, message: 'Comment not found.' };
        }

        return { status: 200, message: `Comment ${isLike ? 'liked' : 'unliked'} successfully.` };
    }
    catch(err) {
        return { status: 500, message: err.message };
    }
} 

export const getReplyService = async (userId, commentId, filter, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    try {
        const sortStage =
            filter === 'recent'
                ? { createdAt: -1 }
                : filter === 'popular'
                ? { likeCount: -1, createdAt: -1 }
                : null;

        if (!sortStage) {
            return { status: 400, message: 'Invalid filter option' };
        }

        const replies = await Comment.aggregate([
            {
                $match: {
                    parentCommentId: new mongoose.Types.ObjectId(commentId) // Only replies for the given comment
                }
            },

            { $addFields: { likeCount: { $size: "$likes" } } },
            { $sort: sortStage },
            { $skip: skip },
            { $limit: limit },

            // Lookup user info (reply author)
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userInfo"
                }
            },
            { $unwind: "$userInfo" },

            // Add computed fields (noOfLikes, author info, flags)
            {
                $addFields: {
                    noOfLikes: "$likeCount",
                    userName: "$userInfo.userName",
                    profilePicture: {
                        $ifNull: [
                            "$userInfo.profilePicture",
                            "https://res.cloudinary.com/djbmyn0fw/image/upload/v1752897230/default-profile_n6tn9o.jpg"
                        ]
                    },
                    isAuthor: { $eq: ["$userId", new mongoose.Types.ObjectId(userId)] },
                    isLiked: { $in: [new mongoose.Types.ObjectId(userId), "$likes"] }
                }
            },

            // Clean up fields
            {
                $project: {
                    likes: 0,
                    likeCount: 0,
                    userInfo: 0
                }
            }
        ]);

        return { status: 200, message: "Get the replies", data: replies };
    } catch (err) {
        return { status: 500, message: err.message };
    }
};

export const replyPostService = async (userId, postId, commentId, text) => {
    try {
        const comment = await Comment.findById(commentId).exec();
        if(!comment) {
            return { status: 404, message: 'Comment not found.' };
        }
        const reply = await Comment.create({
            text: text,
            postId: postId,
            userId: userId,
            parentCommentId: commentId
        });
        await reply.save();
        return { status: 201, message: 'Reply added.' };
    }
    catch(err) {
        console.log(err.message);
        return { status: 500, message: err.message };
    }
}

export const deleteReplyService = async (userId, replyId) => {
    try {
        const deletedReply = await Comment.findOneAndDelete({
            _id: replyId,
            userId: userId,  // Ensure only the owner can delete
            parentCommentId: { $ne: null } // Ensure it's a reply, not a top-level comment
        });

        if (!deletedReply) {
            return { status: 404, message: "Reply not found or unauthorized" };
        }

        return { status: 200, message: "Reply deleted successfully" };
    }
    catch (err) {
        return { status: 500, message: err.message };
    }
};

export const likeReplySevice = async (userId, replyId, isLike) => {
    try {
        const update = isLike 
            ? { $addToSet: { likes: userId } }
            : { $pull: { likes: userId } };

        const comment = await Comment.findByIdAndUpdate(replyId, update, { new: true });

        if(!comment) {
            return { status: 404, message: 'Reply not found.' };
        }

        return { status: 200, message: `Reply ${isLike ? 'liked' : 'unliked'} successfully.` };
    }
    catch(err) {
        return { status: 500, message: err.message };
    }
}


export const savePostService = async (userId, postId, isSave) => {
    await postInteraction(userId, postId, isSave ? 'SAVED' : 'UNSAVED');
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