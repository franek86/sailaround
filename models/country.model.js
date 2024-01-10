import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: true,
        unique: true
    },
    shortFlag:{
        type:String
    },
    longFlag:{
        type:String
    }
    
    
},{timestamps: true});

const Country = mongoose.model('Country',countrySchema);

export default Country;