import User from "../models/userModel.js";

export const getProfilePictureService = async (userId) => {
    try {
        const user = await User.findById(userId).exec();
        if(!user.profilePicture) {
            return { status: 404, message: 'Profile picture not found.' };
        }
        return { status: 200, message: 'Get your profile picture', profilePictureUrl: user.profilePicture };
    }
    catch(err) {
        return { status: 500, message: err.message };
    }
}