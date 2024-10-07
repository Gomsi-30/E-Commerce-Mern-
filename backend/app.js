import express  from 'express';
import product from './routes/productRoute.js';
import user from './routes/userRoute.js';
import cookieParser from 'cookie-parser';

export const app = express();
app.use(express.json())
app.use(cookieParser())
// routes
app.use('/',product)
app.use('/',user)

//middleware
app.use((err,req,res,next)=>{
    err.status = err.status || 500;
    err.message = err.message || 'middleware error';
    res.status(err.status).json({
        success:false,
        error:err.message
    }) 
}
)