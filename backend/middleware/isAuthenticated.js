
import  jwt  from 'jsonwebtoken';
import { User } from './../models/user.js';
import { ErrorHandler } from '../utils/errorHandler.js';


export const isAuthenticated = async(req, res, next) =>{
    const {token} = req.cookies;
    if(!token) return next(new ErrorHandler('Token not found',401));
    try{
    const decode = jwt.verify(token,process.env.JWT_SECRET);
    console.log(decode);
    req.user = await User.findById(decode.id);
    next()
    }catch(e){
        console.log('Decode failed')
        console.log(e)
    } 
}

// Admin checker

export const isAdmin = (req,res,next)=> {
    let roles = ['admin'];
    if(!roles.includes(req.user.role)){
        return next(new ErrorHandler(`Role ${req.user.role} is not accesible for this resource`,401));
    }
    next()
}