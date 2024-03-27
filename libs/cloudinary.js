require('dotenv')
const cloudinary = require('cloudinary').v2
const userSchema = require('../models/user.model')

cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    folder: process.env.CLOUDINARY_FOLDER,
}

async function uploader(file, email) {
    if (!file) return null;
    await userSchema.findOne({ email: email }).exec()
        .then((user) => {
            console.log("User Exists");
            if (user?.profilePic) {
                console.log(user.profilePic);
            }
        })
        .catch((err) => {
            console.log("Error Occured", err);
        })
    const result = await cloudinary.uploader.upload(file, cloudinaryConfig )
        .then((result) => {
            console.log("Image Uploaded", result.secure_url);
            return result.secure_url;
        })
        .catch((err) => {
            return err
        })
    return result;
}

module.exports = uploader