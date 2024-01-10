import Yacht from "../models/yacht.model.js";
import { errorHandler } from "../utils/error.js";

// Method => POST
// Route => api/v1/yachts/create
// Role => Private admin
export const createYacht = async (req,res,next) => {
    const newYachtData = req.body;
    const newYacht = new Yacht(newYachtData);
    try {
    
        await newYacht.save();
        res.status(201).json({data: newYacht,message: "New yacht succesfully added"});
    } catch (error) {
        next(errorHandler(500, 'Post yacht error'))
    }
}

// Method => PATCH
// Route => api/v1/yachts/edit
// Role => Private admin
export const editYacht = async (req,res,next) => {
    
    try {
        const {id} = req.params;
        const updatedYacht = req.body;
    
        const yachtExist = await Yacht.findById(id);

        if(!yachtExist) return next(errorHandler(404, 'Yacht not found'));

        const newUpdatedYacht = await Yacht.findByIdAndUpdate(id, updatedYacht, {new: true});
        res.status(201).json({data: newUpdatedYacht,message: "Yacht succesfully updated"});
    } catch (error) {
        next(errorHandler(500, 'Edit yacht error'))
    }
}

// Method => GET
// Route => api/v1/yachts/id
// Role => Public
export const getYacht = async(req,res,next) =>{
    const {id} = req.params;
    try {
        const yacht = await Yacht.findById(id);

        if(!yacht) return next(errorHandler(404,'Yacht not found'));

        res.status(200).json({data: yacht})
        
    } catch (error) {
        next(errorHandler(500, 'Single yacht error'));
    }
}

// Method => DELETE
// Route => api/v1/yachts/id
// Role => Private admin
export const deleteYacht = async(req,res,next) => {
    const {id} = req.params;
    try {
        const yacht = await Yacht.findByIdAndDelete(id);

        if(!yacht) return next(errorHandler(404,'Yacht not found'));

        res.status(202).json({message: `Yacht ${id} successfully deleted.`});
        
    } catch (error) {
        next(errorHandler(500, 'Delete yacht error'));
    }
}