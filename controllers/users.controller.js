import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";



//Method => GET
//Route => api/v1/users
//Role => Public
export const getUsers = async(req, res ,next) => {
    const {searchResult, sortBy} = req.query;
    const { skip, perPage, page } = req.pagination;
    try {
        const searchQuery = {};
        if(searchResult){
            searchQuery.$or = [
                { firstname: { $regex: searchResult, $options: 'i' } },
                { lastname: { $regex: searchResult, $options: 'i' } },
            ];
        }
       

        const sortOption = {};
         if(sortBy){
            const [field, order] = sortBy.split(':');
            sortOption[field] = order
         } else {
            sortOption.createdAt = 'desc'
         }
       
         const users = await User.find(searchQuery).sort(sortOption).skip(skip).limit(perPage);
         
         res.status(200).json({users, page, perPage,skip});
    } catch (error) {
        next(errorHandler(500, 'User search error'));
    }
}