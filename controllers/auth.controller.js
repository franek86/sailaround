import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// Method => POST
// Route => auth/signup
export const signup = async(req, res, next) => {
    const {firstname, lastname, password, email, role} = req.body;

    const existingUser = await User.findOne({email});

    if(existingUser){
        return next(errorHandler(404, 'User already exists.'))
    }
    const hashPassword = await bcrypt.hash(password,10);
   
    const newUser = new User({
        firstname,lastname,password:hashPassword,email,role
    });

    try {
        await newUser.save();
        res.status(200).json({message: 'User create sucessfully'})
    } catch (error) {
        next(errorHandler(500, 'User error'));
    }
}

// Method: POST
// Route: auth/login
export const login = async(req,res,next) => {
    const {email, password} = req.body;

    try {
        const findUser = await User.findOne({email});
        if(!findUser) return next(errorHandler(404, 'User not found.'));

        const validPassword = await bcrypt.compare(password, findUser.password);
        if(!validPassword) return next(errorHandler(401, 'Wrong credentials'));

        const payload = {
            id: findUser._id,
            role: findUser.role,
        };

        const token = jwt.sign(payload,process.env.JWT_SECRET);
        const {password:pwd,role, ...rest} = findUser._doc;
        res.cookie('access_token', token, {httpOnly:true }).status(200).json(rest)
    } catch (error) {
        next(errorHandler(500, 'Authentication failed'));
    }
    
}

// Method: GET
// Route: auth/logout
export const logout = async(req,res,next) => {
    res.clearCookie("access_token", { sameSite: "none", secure: true }).status(200).send("User has been logged out.");
}