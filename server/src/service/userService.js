import User from "../models/userModel.js";
import Follow from '../models/followModel.js';
import mongoose from "mongoose";
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
    console.log(err.message);
    return { status: 500, message: err.message };
  }
};
