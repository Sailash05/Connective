import User from "../models/userModel.js";
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
        if(!user) {
            return { status: 404, message: 'User not found.' };
        }
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