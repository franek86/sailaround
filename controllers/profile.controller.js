import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";


//Method => GET
//Route => api/v1/user/profile
//Role => Private user,admin, editor
export const userProfile = async(req,res,next) => {
   const user_id = req.user.id;
    try {
        const userMe = await User.findById(user_id);
        if(!userMe) return next(errorHandler(404, 'User not found'));

         const { password,role, ...otherDetails } = userMe._doc;
        res.status(200).json(otherDetails);
        
    } catch (error) {
        next(errorHandler(500, 'Profile error'))
    }
}

//Method => PATCH
//Route => api/v1/user/edit
//Role => Private user,admin, editor
export const editProfile = async(req,res,next) => {
   const user_id = req.user.id;
  
    try {
        const userMe = await User.findById(user_id);
        
        if(!userMe) return next(errorHandler(404, 'User not found'));

         // Ensure the 'role' field is not in the request body
        if (req.body.role) return next(errorHandler(400, 'Error while updating user'));
    

         const newUpdatedProfile = await User.findByIdAndUpdate(user_id,  { $set: req.body }, {new: true});
         const {role, ...showUpdatedProfile} = newUpdatedProfile._doc;
         
         res.status(200).json({data:showUpdatedProfile, message:'Profile successfully updated'});

        
    } catch (error) {
        next(errorHandler(500, 'Profile error'))
    }
}