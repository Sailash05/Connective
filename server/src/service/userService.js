import User from "../models/userModel.js";
import Follow from '../models/followModel.js';
import { cloudinary } from "../config/cloudinary.js";

export const storeProfilePicture = async (profileUrl, userId) => {
    
    try {
        const result = await cloudinary.uploader.upload(profileUrl, {
            folder: `connective_users/profile/${userId}`,
            resource_type: "image",
            allowed_formats: ["jpg", "png", "jpeg"],
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        });
        return result.secure_url;
    }
    catch(err) {
        return '';
    }
}

export const getProfilePictureService = async (userId) => {
    try {
        const user = await User.findById(userId).exec();
        return { status: 200, message: 'Get your profile picture', data: {
            userName: user.userName,
            email: user.email,
            profilePicture: user.profilePicture || 'https://res.cloudinary.com/djbmyn0fw/image/upload/v1752897230/default-profile_n6tn9o.jpg'
        }};
    }
    catch(err) {
        return { status: 500, message: err.message };
    }
}

export const getConnectionStatsService = async (userId) => {
    try {
        const user = await User.findById(userId).exec();

        const following = await Follow.find({ follower: userId }).select("following");

        const followingIds = following.map(f => f.following);
        const mutualCount = await Follow.countDocuments({
            follower: { $in: followingIds },
            following: userId
        });

        return { status: 200, message: 'Get the connection stats.', followersCount: user.followerCount, followingCount: user.followingCount, mutualCount: mutualCount };
    }
    catch(err) {
        return { status: 500, message: err.message };
    }
}

export const addFollowerService = async (followerId, followingId) => {
    try {
        const followingUser = await User.findById(followingId).exec();
        if (!followingUser) {
            return { status: 404, message: "User not found." };
        }

        try {
            await Follow.create({
                follower: followerId,
                following: followingId,
            });

            const updatedFollowerUser = await User.findByIdAndUpdate(
                followerId,
                { $inc: { followingCount: 1 } },
                { new: true }
            ).exec();

            const updatedFollowingUser = await User.findByIdAndUpdate(
                followingId,
                { $inc: { followerCount: 1 } },
                { new: true }
            ).exec();

            return { status: 200, message: "User followed successfully", followingCount: updatedFollowerUser.followingCount };
        }
        catch (err) {
            if (err.code === 11000) {
                return { status: 200, message: "Already followed.", followingCount: (await User.findById(followerId).exec()).followingCount };
            }
            throw err;
        }
    }
    catch (err) {
        return { status: 500, message: err.message };
    }
};


export const unFollowService = async (followerId, followingId) => {
    try {
        const followingUser = await User.findById(followingId).exec();
        if (!followingUser) {
            return { status: 404, message: "User not found." };
        }
        const deleted = await Follow.findOneAndDelete({
            follower: followerId,
            following: followingId,
        }).exec();

        if (!deleted) {
            return { status: 400, message: "You are not following this user." };
        }

        const updatedFollowerUser = await User.findByIdAndUpdate(
            followerId,
            { $inc: { followingCount: -1 } },
            { new: true }
        ).exec();

        await User.findByIdAndUpdate(
            followingId,
            { $inc: { followerCount: -1 } },
            { new: true }
        ).exec();

        return { status: 200, message: "User unfollowed successfully", followingCount: updatedFollowerUser.followingCount };
    } catch (err) {
        return { status: 500, message: err.message };
    }
};