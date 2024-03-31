const express = require("express")
const router = express.Router()

const {getStudentData} = require("../controllers/students");

// Route for user signup

router.get("*", getStudentData)


module.exports = router