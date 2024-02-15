const User = require('../Models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// Register a new user
const register = async (req, res) => {
    try {
        const userExist = await User.findOne({ email: req.body.email });

        if (userExist) {
            return res.status(400).send({ message: 'User already exists', success: false });
        }

        const plainPassword = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(plainPassword, salt);
        
        req.body.password = encryptedPassword;

        const newUser = new User(req.body);
        await newUser.save();

        res.status(200).send({ message: 'User registered successfully', success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error creating user', success: false });
    }
};

// Login a user
const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }); 
        if (!user) {
            return res.status(200).send({ message: 'Invalid email or password', success: false });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(200).send({ message: 'Invalid email or password', success: false });
        }
        else{
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '1d',
            });
            res.status(200).send({ message: 'Logged in successfully', success: true,data:token });
        
        }

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error during login', success: false });
    }
};

module.exports = { register, login };