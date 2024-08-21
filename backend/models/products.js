
import  mongoose  from 'mongoose';
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    rating:{
        type:Number,
        default:0
    },
    images:[{
       public_id:{
        type:String
       },
       url:{
        type:String
       }
    }],
    category:{
        type:String
    },
    stock:{
        type:String
    },
    numOfReviews:{
        type:String
    },
    reviews:[{
        name:{
            type:String
        },
        rating:{
            type:Number
        },
        comment:{
            type:String
        }
    }],
},{
    timestamps:true
})

export const Product = mongoose.model.Product || mongoose.model('Product',productSchema);