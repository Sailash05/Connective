import { response } from "../utils/response.js";

import { getProfilePictureService, getConnectionStatsService, addFollowerService, unFollowService } from "../service/userService.js";

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