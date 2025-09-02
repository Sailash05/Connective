import multer from "multer";
import { postStorage } from '../config/cloudinary.js';

export const postUpload = multer({ storage: postStorage });
