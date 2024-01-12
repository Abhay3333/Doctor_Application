const User = require('../Modals/userModal')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const authToken=require('../middleware/Authentication')


const register = async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        console.log(req.body)
        if (userExists) {
            return res.status(400).send({ msg: 'User Already Exists', success: false });
        }
        
        const password = req.body.password;
        

        const salt = await bcrypt.genSalt(10);

        const encryptedPassword = await bcrypt.hash(password, salt);

        req.body.password = encryptedPassword;

        const newUser = new User(req.body);

        await newUser.save();
        return res.status(200).send('User created successfully!' );
    } catch (error) {
        console.log(error)
        return res.status(404).send(error.message);
    }
};


const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(210).send({ message: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(211).send('Password not matched !');
        } else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1d"
            });
            res.status(200).send({ message: "Login successful", data: token });
        }
    } catch (error) {
        console.log(error);
        res.status(404).send(error.message);
    }
};

const getUserId = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        if (!user) {
            return res.status(404).send({ message: "User does not exist", success: false });
        }
        res.status(200).send({
            success: true,
            data: {
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ message: "Internal server error", success: false, error: error.message });
    }
};







module.exports = {register,login,getUserId}