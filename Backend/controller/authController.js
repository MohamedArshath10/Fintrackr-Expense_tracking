const User = require('../models/User')
const jwt = require('jsonwebtoken');

// Generate JWt tokens

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn : "1h"})
}

// Register user
exports.registerUser = async (req, res) => {
    const {fullName, email, password, profileImageUrl} = req.body
    // validation
    if(!fullName || !email || !password){
        return res.status(400).json({message: "Please fill in all fields."})
    }
    try{
        // check wheather email already exists
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message: "Email already exists."})
        }

        // create the user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        })
        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        })
    }catch(err) {
        res
            .status(500)
            .json({message: "Failed to create user.", error: err.message})
    }
}

// Login user
exports.loginUser = async (req, res) => {
    const{email, password} = req.body
    // validation
    if(!email || !password){
        return res.status(400).json({message: "Please fill in all fields."})
    }
    try{
        const user = await User.findOne({email})
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({message: "Invalid email or password."})
        }
        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        })
    }catch(err){
        res
            .status(500)
            .json({message: "Failed to login user.", error: err.message})
    }
}

// Register user
exports.getUserInfo = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password")

        if(!user){
            return res.status(404).json({message: "User not found."})
        }
        res.status(200).json(user)
    }catch(err){
        res
            .status(500)
            .json({message: "Failed to get user info.", error: err.message})
    }
}