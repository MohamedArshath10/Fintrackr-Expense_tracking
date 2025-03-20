const express = require('express')
const {protect} = require('../middleware/authMiddleware')

const {registerUser, loginUser, getUserInfo,} = require("../controller/authController")
const upload = require('../middleware/uploadMiddleware')

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/getUser", protect, getUserInfo)

router.post("/upload-image", upload.single("image"), (req, res) => {
    if(!req.file){
        return res.status(400).json({ message: "No file uploaded"})
    }
    const imageUrl = `${req.protocol}://${req.post("host")}/upload/${req.file.filename}`

    res.status(200).json({imageUrl})
})

module.exports = router