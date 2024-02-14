const User = require('../Models/user.model.js');
const bcrypt = require('bcryptjs');

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

const login = async (req, res) => {
    try {
        

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error during login', success: false });
    }
};

module.exports = { register, login };
