import mongoose from "mongoose";

const yachtTypeSchema = new mongoose.Schema({
    
    yachtType:{
        type: String,
        required: true,
        unique: true
    },
    
    
},{timestamps: true});

const YachtType = mongoose.model('YachtType',yachtTypeSchema);

export default YachtType;