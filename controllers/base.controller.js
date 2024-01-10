import Base from '../models/base.model.js';
import { errorHandler } from "../utils/error.js";

// Method => POST
// Route => api/v1/base/create
// Role => Admin
export const createBase = async(req,res,next) => {
    const reqNewBase = req.body;
    const newBase = new Base(reqNewBase);
    try {
        await newBase.save();
       
        res.status(200).json({data:newBase, message:"New base added"});
    } catch (error) {
        next(errorHandler(500, "Base create error"))
    }
}