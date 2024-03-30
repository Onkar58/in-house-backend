const userSchema = require('../models/user.model')
const uploader = require('../libs/cloudinary');
const { getAllUserData, homepageData } = require('../libs/getData');

exports.createUser = async (req, res) => {
    console.log('Create User', req.body);
    try {
        const { email, name, profilePic } = req.body
        const ifUserExists = await userSchema.findOne({ email: email }).exec();
        if (ifUserExists) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        const cloudinaryLink = await uploader(profilePic, email)
        console.log("Link = ", cloudinaryLink);
        if (!cloudinaryLink) {
            return res.status(500).json({
                success: false,
                message: "Error in uploading image",
            });
        }

        const user = new userSchema({
            email: email,
            name: name,
            profilePic: cloudinaryLink,
        });
        await user.save();
    }
    catch (err) {
        return res.status(500).json({ error: err.message, message: "Error in creating user" });
    }
    res.send('Create User');
}

exports.getUserByEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userSchema.findOne({ email: email }).exec();
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            user: user,
        });
    }
    catch (err) {
        return res.status(500).json({ error: err.message, message: "Error in getting user" });
    }
}

exports.getStudentsData = async (req, res) => {
    try {
        const { email } = req.body;
        const user123 = await userSchema.findOne({ email: email }).exec();
        if (!user123) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }
        const studentIds = user123.studentIds;
        console.log(studentIds);
        const returnData = []
        const promiseArray = studentIds.map(username => getAllUserData(username))
        await Promise.all(promiseArray)
            .then(data => returnData.push(data))
            .catch(error => new Error("Error in promise Resolving"))
        res.status(200).json({
            success: true,
            data: returnData,
        });
    }
    catch (err) {
        return res.status(500).json({ error: err.message, message: "Error in getting user data" });
    }
}

exports.addStudentId = async (req, res) => {
    try {
        const { email, input } = req.body
        let studentId
        if (input.includes("https") || input.includes("leetcode.com")) {
            const splittt = input.split("/")
            studentId = splittt[splittt.length - 1]
        }
        else
            studentId = input
        const teacher = await userSchema.findOne({ email: email }).exec()
        if (!teacher) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            })
        }
        if (teacher.studentIds.includes(studentId)) {
            return res.status(403).json({
                success: false,
                message: "Student is already added"
            })
        }
        teacher.studentIds.push(studentId)
        teacher.save();
        res.status(201).json({
            success: true,
            message: "Student Added Successfully",
        })
    }
    catch (err) {
        res.status(500).json({ error: err.message, message: "Error" })
    }
}


exports.getHomepageData = async (req, res) => {
    try {
        const { email } = req.body

        const teacher = await userSchema.findOne({ email: email }).exec()
        if (!teacher) {
            return res.status(200).json({
                success: false,
                message: "Cannot get Teacher"
            })
        }
        const studentIds = teacher.studentIds
        const promiseArray = studentIds.map(username => homepageData(username))
        let returnData = []
        await Promise.all(promiseArray)
            .then(data => returnData = data)
            .catch(error => new Error("Error in getting Students"))
        return res.status(200).json({
            success: true,
            data: returnData,
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            error: err
        })
    }
}