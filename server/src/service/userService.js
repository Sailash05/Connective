import User from "../models/userModel.js";
import Follow from '../models/followModel.js';
import Post from '../models/postModel/postModel.js'
import mongoose, { mongo } from "mongoose";
import { cloudinary } from "../config/cloudinary.js";

import { getPostService } from "./postService.js";

export const storeProfilePicture = async (profileUrl, userId) => {
  try {
    const result = await cloudinary.uploader.upload(profileUrl, {
      folder: "connective_users/profile",
      resource_type: "image",
      allowed_formats: ["jpg", "png", "jpeg"],
      public_id: `${userId}-profile`,
      overwrite: true,
    });

    return result.secure_url;
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    return "";
  }
};

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

export const getProfileService = async (userId) => {
    try {
        const user = await User.findById(userId).select({
            userName: 1,
            email: 1,
            bio: 1,
            profilePicture: 1,
            bannerPicture: 1,
            location: 1,
            website: 1,
            resume: 1,
            skill: 1,
            interest: 1,
            experience: 1,
            followerCount: 1,
            followingCount: 1
        }).exec();

        const { _id } = await Post.findOne({ userId: userId }).sort({ createdAt: -1 }).select({_id: 1}).exec();
        const userObj = user.toObject();
        const post = await getPostService(_id, userId);
        const latestPost = post.data;
        userObj.post = latestPost;

        return { status: 200, message: 'Get your profile data.', data: userObj };
    }
    catch(err) {
        return { status: 500, message: err.message };
    }
}

export const updateProfileService = async (userId, profileData) => {
    const { _id, userName, email, bio, profilePicture, bannerPicture, location, website, resume, skill, interest, experience } = profileData;
    try {
        const updatedUser = await User.findByIdAndUpdate( userId, {
            $set: {
                userName,
                email,
                bio,
                profilePicture,
                bannerPicture,
                location,
                website,
                resume,
                skill,
                interest,
                experience,
                updatedAt: new Date(),
            }},
        { new: true, runValidators: true }
        ).lean();

        if (!updatedUser) {
            return { status: 404, message: "User not found" };
        }

        return { status: 200, message: 'User profile updated successfully', data: updatedUser };
    }
    catch(err) {
        return { status: 500, message: err.message };
    }
}

export const updateProfilePictureService = async (userId, profilePictureUrl) => {
    try {
        await User.updateOne({_id: new mongoose.Types.ObjectId(userId)}, {profilePicture: profilePictureUrl});
        return { status: 200, message: 'Profile picture updated successfully.', newProfilePicture: profilePictureUrl };
    }
    catch(err) {
        return { status: 500, message: err.message };
    }
}

export const updateBannerPictureService = async (userId, bannerPictureUrl) => {
    try {
        await User.updateOne({_id: new mongoose.Types.ObjectId(userId)}, {bannerPicture: bannerPictureUrl});
        return { status: 200, message: 'Banner picture updated successfully.', newBannerPicture: bannerPictureUrl };
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

export const getOverviewService = async (userId) => {
    try {
        const userFollowing = await Follow.find({ follower: new mongoose.Types.ObjectId(userId)}).select({
            _id: 0,
            following: 1
        });
        const userFollowingArray = userFollowing.map(f => new mongoose.Types.ObjectId(f.following));
        

        const suggestedUser = await User.aggregate([
            {$match: {
                _id: {$nin: [...userFollowingArray, new mongoose.Types.ObjectId(userId)]}
            }},
            { $sample: { size: 3 } },
            {
                $lookup: {
                from: "follows",
                localField: "_id",
                foreignField: "following",
                as: "theirFollowers"
                }
            },
            {
                $lookup: {
                from: "follows",
                let: { myId: new mongoose.Types.ObjectId(userId)},
                pipeline: [
                    {$match: { $expr: {$eq: ['$following', '$$myId']}}}
                ],
                as: "myFollowers"
                }
            },
            {
                $addFields: {
                mutualFollowers: {
                    $setIntersection: [
                        { $map: { input: "$theirFollowers", as: "f", in: "$$f.follower" } },
                        { $map: { input: "$myFollowers", as: "f", in: "$$f.follower" } }
                    ]
                }
                }
            },
            {
                $addFields: {
                mutualFollowersCount: { $size: "$mutualFollowers" }
                }
            },
            { $project: {
                userName: 1,
                bio: 1,
                profilePicture: 1,
                mutualFollowersCount: 1
            }}
        ]);

        const topProfessionals = await User.find({
            _id: {$ne: new mongoose.Types.ObjectId(userId)},
            followerCount: {$gte: 0}
        }).sort({ followerCount: -1 }).limit(3).select({
            userName: 1,
            bio: 1,
            followerCount: 1
        });

        const recentlyJoined = await User.find({_id: { $ne: new mongoose.Types.ObjectId(userId) }})
        .sort({ createdAt: -1 })
        .limit(3)
        .select({ userName: 1, profilePicture: 1, bio: 1, createdAt: 1 });

        const recentlyJoinedWithFollow = await Promise.all(
            recentlyJoined.map(async (user) => {
                const isFollowed = await Follow.exists({
                    follower: new mongoose.Types.ObjectId(userId),
                    following: user._id
                });
                return {
                    ...user.toObject(), // convert Mongoose doc to plain object
                    isFollowed: !!isFollowed
                };
            })
        );

        return { status: 200, message: 'Get the user overview', suggestedUser, topProfessionals, recentlyJoinedWithFollow };
    }
    catch(err) {
        return { status: 500, message: err.message };
    }
}

export const getUsersService = async (userId, limit, query) => {
    try {
        const userList = await User.aggregate([
            {$limit: Number(limit)},
            {$sort: { followerCount: -1 }},
            {$match: { $or: [
                {
                    "userName": {
                    $regex: query.trim(),
                    $options: "i",
                    },
                },
                {
                    "email": {
                    $regex: query.trim(),
                    $options: "i",
                    },
                }]}
            },
            {$match: {
                _id: { $ne: new mongoose.Types.ObjectId(userId) }
            }},
            {
                $lookup: {
                    from: 'follows',
                    localField: '_id',
                    foreignField: 'following',
                    as: 'theirFollowers'
                }
            },
            {
                $lookup: {
                    from: "follows",
                    let: { myId: new mongoose.Types.ObjectId(userId) },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$following", "$$myId"] } } }
                    ],
                    as: "myFollowers"
                }
            },
            {
                $addFields: {
                mutualFollowers: {
                    $setIntersection: [
                        { $map: { input: "$theirFollowers", as: "f", in: "$$f.follower" } },
                        { $map: { input: "$myFollowers", as: "f", in: "$$f.follower" } }
                    ]
                }
                }
            },
            {
                $addFields: {
                mutualFollowersCount: { $size: "$mutualFollowers" }
                }
            },
            {
                $lookup: {
                from: "follows",
                let: { me: new mongoose.Types.ObjectId(userId), other: "$_id" },
                pipeline: [
                    {
                    $match: {
                        $expr: {
                        $and: [
                            { $eq: ["$follower", "$$me"] },
                            { $eq: ["$following", "$$other"] }
                        ]
                        }
                    }
                    }
                ],
                as: "isFollowedDoc"
                }
            },
            {
                $addFields: {
                isFollowed: { $gt: [{ $size: "$isFollowedDoc" }, 0] }
                }
            },
            {$project: {
                userName: 1,
                email: 1,
                profilePicture: 1,
                bio: 1,
                mutualFollowersCount: 1,
                isFollowed: 1
            }}
        ])
        return { status: 200, message: 'Get the user list', userList: userList };
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
    }
    catch (err) {
        return { status: 500, message: err.message };
    }
};

export const getUserProfileListService = async (userId, query) => {
    const { page = 1, limit = 10, search, sortBy, isMutual, type } = query;

    const matchAttribute =
        type === "followers"
        ? { following: new mongoose.Types.ObjectId(userId.trim()) }
        : { follower: new mongoose.Types.ObjectId(userId.trim()) };

    const localField = type === "followers" ? "follower" : "following";

    try {
        // ---------------- MAIN QUERY ----------------
        const userProfileList = await Follow.aggregate([
        { $match: matchAttribute },
        {
            $lookup: {
            from: "users",
            let: { userId: `$${localField}` },
            pipeline: [
                { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
                {
                $project: {
                    userName: 1,
                    email: 1,
                    profilePicture: 1,
                    followerCount: 1,
                    skill: 1,
                    bio: 1,
                    badges: 1,
                    website: 1,
                },
                },
            ],
            as: "userProfile",
            },
        },
        { $unwind: "$userProfile" },

        // Mutual check
        {
            $lookup: {
            from: "follows",
            let: {
                followerId: "$follower",
                followingId: "$following",
            },
            pipeline: [
                {
                $match: {
                    $expr: {
                    $and: [
                        { $eq: ["$follower", "$$followingId"] },
                        { $eq: ["$following", "$$followerId"] },
                    ],
                    },
                },
                },
            ],
            as: "mutualFollow",
            },
        },
        { $addFields: { isMutual: { $gt: [{ $size: "$mutualFollow" }, 0] } } },
        { $project: { mutualFollow: 0 } },

        // Search filter
        ...(search && search.trim().length > 0
            ? [
                {
                $match: {
                    $or: [
                    {
                        "userProfile.userName": {
                        $regex: search.trim(),
                        $options: "i",
                        },
                    },
                    {
                        "userProfile.email": {
                        $regex: search.trim(),
                        $options: "i",
                        },
                    },
                    ],
                },
                },
            ]
            : []),

        // Mutual-only filter
        ...(isMutual === "true" ? [{ $match: { isMutual: true } }] : []),

        // Sorting
        ...(sortBy === "recent"
            ? [{ $sort: { createdAt: -1 } }]
            : sortBy === "name"
            ? [{ $sort: { "userProfile.userName": 1 } }]
            : sortBy === "popular"
            ? [{ $sort: { "userProfile.followerCount": -1 } }]
            : []),

        // isFollowed (current user follows them back)
        {
            $lookup: {
            from: "follows",
            let: { targetUserId: `$${localField}` },
            pipeline: [
                {
                $match: {
                    $expr: {
                    $and: [
                        {
                        $eq: [
                            "$follower",
                            new mongoose.Types.ObjectId(userId),
                        ],
                        },
                        { $eq: ["$following", "$$targetUserId"] },
                    ],
                    },
                },
                },
            ],
            as: "followedBack",
            },
        },
        { $addFields: { isFollowed: { $gt: [{ $size: "$followedBack" }, 0] } } },
        { $project: { followedBack: 0 } },

        // Pagination
        { $skip: (Number(page) - 1) * Number(limit) },
        { $limit: Number(limit) },
        ]);

        const updatedProfileList = userProfileList.map((profile) => {
        profile.isOnline = true; // add online flag
        return profile;
        });

        // ---------------- COUNT QUERY ----------------
        const totalDocumentResult = await Follow.aggregate([
        { $match: matchAttribute },
        {
            $lookup: {
            from: "users",
            let: { userId: `$${localField}` },
            pipeline: [
                { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
            ],
            as: "userProfile",
            },
        },
        { $unwind: "$userProfile" },

        ...(search && search.trim().length > 0
            ? [
                {
                $match: {
                    $or: [
                    {
                        "userProfile.userName": {
                        $regex: search.trim(),
                        $options: "i",
                        },
                    },
                    {
                        "userProfile.email": {
                        $regex: search.trim(),
                        $options: "i",
                        },
                    },
                    ],
                },
                },
            ]
            : []),

        ...(isMutual === "true"
            ? [
                {
                $lookup: {
                    from: "follows",
                    let: {
                    followerId: "$follower",
                    followingId: "$following",
                    },
                    pipeline: [
                    {
                        $match: {
                        $expr: {
                            $and: [
                            { $eq: ["$follower", "$$followingId"] },
                            { $eq: ["$following", "$$followerId"] },
                            ],
                        },
                        },
                    },
                    ],
                    as: "mutualFollow",
                },
                },
                { $addFields: { isMutual: { $gt: [{ $size: "$mutualFollow" }, 0] } } },
                { $match: { isMutual: true } },
            ]
            : []),

        { $count: "total" },
        ]);

        const totalDocument =
        totalDocumentResult.length === 0 ? 0 : totalDocumentResult[0].total;

        const paging = {
        totalDocument,
        currentPage: Number(page),
        totalPage: Math.ceil(totalDocument / Number(limit)),
        };

        return {
        status: 200,
        message: "Get profile list.",
        userProfile: updatedProfileList,
        paging,
        };
    } catch (err) {
        return { status: 500, message: err.message };
    }
};
