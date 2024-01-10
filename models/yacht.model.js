import mongoose from "mongoose";

const yachtSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: true,
    },
    cabins:{
        type: String,
        required: true,
    },
    lenght:{
        type: String,
        required: true,
    },
     heads:{
        type: String,
        required: true,
    },
    berths:{
        type: String,
        required: true,
    },
    construction_year:{
        type: Number,
        required: true,
    },
    refit_year:{
        type: Number
    },
    draft:{
        type: Number
    },
    beam:{
        type: Number
    },
    displacment:{
        type: Number
    },
    fuel_capacity:{
        type: Number
    },
    engine:{
        type: String
    },
    water_capacity:{
        type: Number
    },
    mainsail:{
        type: String
    },
    genoa:{
        type: String
    },
    mainImage: { 
        type: String, 
        required: true 
    },
    interiorImage: { 
        type: String, 
        required: true 
    },
    planImage: { 
        type: String, 
        required: true 
    },
    images: [{ type: String }],
    base: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Base' 
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country' 
    },
     yachtType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'YachtType' 
    },
    
},{timestamps: true});

const Yacht = mongoose.model('Yacht',yachtSchema);

export default Yacht;