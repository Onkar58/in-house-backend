const express = require("express")
const router = express.Router()

const {getStudentData, getUserSkillStats} = require("../controllers/students");

// Route for user signup

router.get("*", getStudentData)
router.post("/getskills", getUserSkillStats)


module.exports = router