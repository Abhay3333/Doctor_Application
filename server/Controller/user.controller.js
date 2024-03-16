const User = require('../Models/user.model.js');
const bcrypt = require('bcryptjs');
const Doctor = require('../Models/doctor.model.js');
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
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '1d',
            });
            res.status(200).send({ message: 'Logged in successfully', success: true,data:token });
        
        }

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error during login', success: false });
    }
};

//Get user details by id
const getUserId = async (req, res) => {
    try {
        const user = await User.findOne({_id:req.body.userId});
        user.password=undefined
        if (!user) {
            return res.status(200).send({ message: 'User not found', success: false });
        }else{
            return res.status(200).send({  success: true,data:user});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error getting user details', success: false });
    }
};

const applyDoctor = async (req, res) => {
    try {
        const newDoctor = new Doctor({...req.body,status:"pending",speacialization: req.body.speacialization || "Default Specialization" });
        await newDoctor.save();
        const adminUser = await User.findOne({isAdmin:true})

        const unseenNotification = adminUser.unseenNotification
        unseenNotification.push({
            type:"new-doctor-request",
            message:`${newDoctor.firstName} ${newDoctor.lastName} has applied for doctor account`,
            data:{
                doctorId:newDoctor._id,
                name:newDoctor.firstName +" "+ newDoctor.lastName
            },
            onClickPath:"/admin/doctors"
        })
        await User.findByIdAndUpdate(adminUser._id,{unseenNotification})
        res.status(200).send({ message: 'Doctor account applied successfully', success: true });
            } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error applying Doctor account', success: false });
    }
};

module.exports = { register, login,getUserId,applyDoctor};
