import  express  from 'express';
import product from './routes/productRoute.js';
// import  {error}  from './middleware/error.js';
export const app = express()
app.use(express.json())

app.use('/api',product)

app.use((err,req,res,next)=>{
    err.status = err.status || 500;
    err.message = err.message || 'middleware error';
    res.status(err.status).json({
        success:false,
        error:err
    }) 
}
)