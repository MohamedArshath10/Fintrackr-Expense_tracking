const express = require('express')
const {protect} = require('../middleware/authMiddleware')

const {registerUser, loginUser, getUserInfo,} = require("../controller/authController")

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/getUser", protect, getUserInfo)

router.post()

module.exports = router