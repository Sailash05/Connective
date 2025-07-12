import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const postStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => ({
        folder: `connective_posts/${req.user.userId}`,
        allowed_formats: ['jpg', 'png', 'jpeg', 'mp4', 'mov'],
    }),
});


const profileStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'connective_users/profile',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    }
})
export { cloudinary, postStorage, profileStorage };