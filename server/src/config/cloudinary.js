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
    cloudinary,
    params: (req, file) => ({
        folder: `connective_posts/${req.user.userId}`,
        resource_type: 'auto',
        allowed_formats: ['jpg', 'png', 'jpeg', 'mp4', 'mov'],
        public_id: `${Date.now()}-${file.originalname.split('.')[0]}`
    }),
});

const profileStorage = new CloudinaryStorage({
    cloudinary,
    params: (req, file) => ({
        folder: 'connective_users/profile',
        resource_type: 'image',
        allowed_formats: ['jpg', 'png', 'jpeg'],
        public_id: `${req.user.userId}-profile`,
        overwrite: true
    })
});

const bannerStorage = new CloudinaryStorage({
    cloudinary,
    params: (req, file) => ({
        folder: 'connective_users/banner',
        resource_type: 'image',
        allowed_formats: ['jpg', 'png', 'jpeg'],
        public_id: `${req.user.userId}-banner`,
        overwrite: true
    })
});

export { cloudinary, postStorage, profileStorage, bannerStorage };
