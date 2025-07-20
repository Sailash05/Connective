import { response } from "../utils/response.js";

import { getProfilePictureService } from "../service/userService.js";

export const getProfilePicture = async (req, res) => {
    try {
        const result = await getProfilePictureService(req.user.userId);
        if(result.status === 200) {
            return res.status(200).send(response('SUCCESS', result.message, { profilePictureUrl: result.profilePictureUrl }));
        }
        else if(result.status === 404) {
            return res.status(404).send(response('FAILED', result.message, null));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}