import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken"

export const verifyToken = (requiredRoles) => async(req,res,next) => {
    const token = req.cookies.access_token || req.headers.authorization;

    if(!token) return next(errorHandler(401, 'Unauthorize'));

    jwt.verify(token, process.env.JWT_SECRET, (err,decode) => {
       
        if(err) return next(errorHandler(401, 'Failed to authenticate token')); 

        if (!decode.role) return next(errorHandler(403, 'Role not defined in the token'));
    

        // Check if the user's role matches one of the required roles
        if (requiredRoles.includes(decode.role) || decode.role === 'admin') {
            req.user = decode;
            next();
        } else {
        return next(errorHandler(403, 'Unauthorized'));
        }
    });
}