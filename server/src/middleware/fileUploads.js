import multer from "multer";
import { postStorage, profileStorage, bannerStorage } from '../config/cloudinary.js';

export const postUpload = multer({ storage: postStorage });

export const profilePictureUpload = multer({ storage: profileStorage });

export const bannerPictureUpload = multer({ storage: bannerStorage });