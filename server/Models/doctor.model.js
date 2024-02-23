const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true

    },
    firstName:{
        type: String,
        required: true
    
    },
    lastName:{
        type: String,
        required: true
    },
   
    phoneNumber:{
        type: String,
        required: true
    },
    website:{
        type: String,
        required: true
    
    },
    address:{
        type: String,
        required: true
    
    },
    speacialization:{
        type: String,
        required: true
    
    },
    experience:{
        type: String,
        required: true
    
    
    },
    feePerConsultation:{
        type: Number,
        required: true
    
    },
    timings:{
        type: Array,
        required: true
    }
   
    
    

},{
    timestamps: true

});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;