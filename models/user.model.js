import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    
    email:{
        type: String,
        required: true,
        unique: true
    },
    firstname:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    /* country:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    telephone:{
        type: String,
        required: true,
    }, */
    role: { 
        type: String, 
        enum: ['admin','editor', 'user'], 
        default: 'user' 
    },
    
},{timestamps: true});

const User = mongoose.model('User',userSchema);

export default User;