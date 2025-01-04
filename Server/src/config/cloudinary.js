import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';

// Tải biến môi trường từ file .env
dotenv.config();

const connectCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // Đảm bảo đúng tên biến
        api_key: process.env.CLOUDINARY_API_KEY,        // Đảm bảo đúng tên biến
        api_secret: process.env.CLOUDINARY_API_SECRET   // Đảm bảo đúng tên biến
    });
};


export default connectCloudinary;
