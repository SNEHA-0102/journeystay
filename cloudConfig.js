const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { v4: uuidv4 } = require('uuid'); // Import UUID

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'journey_stage', // Folder where images are stored
        allowed_formats: ["png", "jpg", "jpeg"], // Allowed file types
        public_id: (req, file) => uuidv4(), // Generate unique filename
    },
});

module.exports = {
    cloudinary, 
    storage
};
