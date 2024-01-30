const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isDoctor:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    seeNotifications:{
        type:Array,
        default:[]
    },
    unseenNotifications:{
        type:Array,
        default:[]
    },
})

 module.exports = mongoose.model('user',userSchema)