import { response } from "../utils/response.js";

import { getProfilePictureService, getProfileService, updateProfileService, updateProfilePictureService, updateBannerPictureService, getOverviewService, getUsersService, getConnectionStatsService, addFollowerService, unFollowService, getUserProfileListService } from "../service/userService.js";

export const getProfilePicture = async (req, res) => {
    try {
        const result = await getProfilePictureService(req.user.userId);
        if(result.status === 200) {
            return res.status(200).send(response('SUCCESS', result.message, result.data ));
        }
        else if(result.status === 404) {
            return res.status(404).send(response('FAILED', result.message, null));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}

export const getProfile = async (req, res) => {
    const { userId } = req.query;
    try {
        const result = await getProfileService(userId);
        if(result.status === 200 ) {
            return res.status(200).send(response('SUCCESS', result.message, result.data))
        }
        else {
            return res.status(result.status).send(response('FAILED', result.message, null));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}

export const updateProfile = async (req, res) => {
    const userId = req.user.userId;
    try {
        const result = await updateProfileService(userId, req.body);
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

export const updateProfilePicture = async (req, res) => {
    const userId = req.user.userId;
    try {
        if (!req.file || !req.file.path) {
            return res.status(400).send(response('FAILED', ['No file uploaded.'], null));
        }
        const imageUrl = req.file.path;
        const result = await updateProfilePictureService(userId, imageUrl);
        if(result.status === 200) {
            return res.status(200).send(response('SUCCESS', result.message, { newProfilePicture: result.newProfilePicture }));
        }
        else {
            return res.status(result.status).send(response('FAILED', result.message, null));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}

export const updateBannerPicture = async (req, res) => {
    const userId = req.user.userId;
    try {
        if (!req.file || !req.file.path) {
            return res.status(400).send(response('FAILED', ['No file uploaded.'], null));
        }
        const imageUrl = req.file.path;
        const result = await updateBannerPictureService(userId, imageUrl);
        if(result.status === 200) {
            return res.status(200).send(response('SUCCESS', result.message, { newBannerPicture: result.newBannerPicture }));
        }
        else {
            return res.status(result.status).send(response('FAILED', result.message, null));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}

export const getOverview = async (req, res) => {
    const userId = req.user.userId;
    try {
        const result = await getOverviewService(userId);
        if(result.status === 200) {
            return res.status(200).send(response('SUCCESS', result.message, {
                suggestedUser: result.suggestedUser,
                topProfessionals: result.topProfessionals,
                recentlyJoined: result.recentlyJoinedWithFollow
            }));
        }
        else {
            return res.status(result.status).send(response('FAILED', result.message, null));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}

export const getUsers = async (req, res) => {
    const userId = req.user.userId;
    const { query, limit } = req.query;
    try {
        const result = await getUsersService(userId, limit, query);
        if(result.status === 200) {
            return res.status(200).send(response('SUCCESS', result.message, result.userList));
        }
        else {
            return res.status(result.status).send(response('FAILED', result.message, null));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}

export const getConnectionStats = async (req, res) => {
    try {
        const result = await getConnectionStatsService(req.user.userId);
        if(result.status === 200) {
            return res.status(200).send(response('SUCCESS', result.message, {
                followersCount: result.followersCount,
                followingCount: result.followingCount,
                mutualCount: result.mutualCount
            } ));
        }
        else {
            return res.status(404).send(response('FAILED', result.message, null));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}

export const addFollower = async (req, res) => {
    const followingId = req.params.userId;
    const followerId = req.user.userId;
    try {
        const result = await addFollowerService(followerId, followingId);
        if(result.status === 200) {
            return res.status(200).send(response('SUCCESS', result.message, {
                followingCount: result.followingCount
            }));
        }
        else {
            return res.status(result.status).send(response('FAILED', result.message, null));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}

export const unFollow = async (req, res) => {
    const followingId = req.params.userId;
    const followerId = req.user.userId;
    try {
        const result = await unFollowService(followerId, followingId);
        if(result.status === 200) {
            return res.status(200).send(response('SUCCESS', result.message, {
                followingCount: result.followingCount
            }));
        }
        else {
            return res.status(result.status).send(response('FAILED', result.message, null));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}

export const getUserProfileList = async (req, res) => {
    const userId = req.user.userId;
    try {
        const result = await getUserProfileListService(userId, req.query);
        if(result.status === 200) {
            return res.status(200).send(response('SUCCESS', result.message, {
                userProfile: result.userProfile,
                paging: result.paging
            }));
        }
        else { 
            return res.status(result.status).send(response('FAILED', result.message, null));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}