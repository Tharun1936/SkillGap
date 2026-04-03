const userModel = require("../models/user.model")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/user.model");
const tokenBlacklistModel = require("../models/blacklist.model");


//register controller
async function registerUserController(req,res) {

    const {username, email, password} = req.body;

    // Validate user input
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
    }

    // Create new user
    const hash = await bcrypt.hash(password, 10);
    const newUser = new userModel({ username, email, password: hash});
    const token  = jwt.sign(
        { id: newUser._id, username: newUser.username },
        process.env.JWT_SECRET,
        { expiresIn: '1d'}
    )
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully",
        user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
        }
     });
}


//login controller
async function loginUserController (req,res) {
    const {email, password} = req.body;

    const user = await userModel.findOne({email})

    if(!user) {
        return res.status(404).json({message: "User not found"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            token
        }
    });
}

//logout controller
async function logoutUserController(req, res) {
    const token = req.cookies.token;
    if(token){
        await tokenBlacklistModel.create({ token });
    }
    res.clearCookie("token");

    res.status(200).json({ message: "User logged out successfully" });
}

//getme controller
async function getMeController(req, res) {
    const user = await User.findById(req.user.id);
    res.status(200).json({ 
        message: "User details retrieved successfully",
        user : {
        id: user._id,
        username: user.username,
        email: user.email
    }});
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}