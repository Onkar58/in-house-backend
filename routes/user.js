const express = require("express")
const router = express.Router()

const {createUser, getUserByEmail, getStudentsData, addStudentId, getHomepageData} = require("../controllers/user");

// Route for user signup
router.post("/createuser", createUser)
router.post("/getuserbyemail", getUserByEmail )
router.post("/getstudentsdata", getStudentsData)
router.post("/addstudent",  addStudentId)
router.post("/gethomepagedata",  getHomepageData)


module.exports = router