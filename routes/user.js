const express = require("express")
const router = express.Router()

const {
    createUser,
    getUserByEmail,
    getStudentsData,
    addStudentId,
    checkStudent,
    deleteStudent,
    addBatch,
    getHomepageData,
    getAllStudentsSkillStats,
    deleteBatch
} = require("../controllers/user");

// Route for user signup
router.post("/createuser", createUser)
router.post("/getuserbyemail", getUserByEmail)
router.post("/getstudentsdata", getStudentsData)
router.post("/addstudent", addStudentId)
router.post("/checkstudent", checkStudent)
router.post("/deletestudent", deleteStudent)
router.post("/addbatch", addBatch)
router.post("/deletebatch", deleteBatch)
router.post("/gethomepagedata", getHomepageData)
router.post("/getallstudentsskillstats", getAllStudentsSkillStats)


module.exports = router