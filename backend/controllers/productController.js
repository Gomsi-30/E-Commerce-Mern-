import catchAsyncErrors from "../middleware/catchAsyncError.js";
import { Product } from "../models/products.js"
import { ApiFeature } from "../utils/apiFeature.js";
import { ErrorHandler } from "../utils/errorHandler.js";

export const createProducts = async(req,res)=>{
   console.log(req.body);
   req.body.user = req.user._id;
   const product = await Product.create(req.body);
   res.status(200).send(product)
}

export const getAllProducts = async(req,res)=>{
   const productShow = 2;
   const productCount = await Product.countDocuments();
   const apifeature = new ApiFeature(Product.find(),req.query).search().filter().pagination(productShow);
   const getData = await apifeature.query;
   res.status(200).send(getData)
}
  
export const getAllProductsById = catchAsyncErrors(async(req,res,next)=>{
   const getData = await Product.findById(req.params.id)
   if(!getData){
      return next(new ErrorHandler('product not found',400))
   }
   res.status(200).send({data:getData,bdme:productCount})
});

export const deleteProductsById = async(req,res)=>{
   const getData = await Product.deleteOne({_id:req.params.id})
   res.status(200).send(getData)
}

export const updateProductById = async(req,res)=>{
   const data = req.body
   const getData = await Product.updateOne(
     {_id: req.params.id},
      data, 
      { new: true } 
    );
   console.log(getData)
   res.status(200).send(getData)
}


export const review = async (req,res) => {
   const {comment,rating,pid} = req.body;
  
   const data = {
      user : req.user._id,
      name : req.user.name,
      comment,
      rating
   }
   try{
   const product = await Product.findOne({_id: pid});
  
   // If review already exists
   const filter = product.reviews.find((rev)=>
      rev.user.toString() == req.user._id.toString()
   )

   if(filter){
       product.reviews.forEach((rev)=>{
         if(rev.user.toString() == req.user._id.toString()){
            rev.comment = comment,
            rev.rating = rating
         }
       })
   }else{
   product.reviews.push(data);
   product.numOfReviews = product.reviews.length;
   }
   let avg = 0;
   product.reviews.forEach((rev)=>{
      avg+=rev.rating;
   })
   product.rating = avg/product.reviews.length;
   await product.save({ validateBeforeSave: false });
   res.send(product);
}catch(e){
   res.send(e)
}
}


// Delete Review
export const deleteReview = async (req, res, next) => {
   const { pid } = req.body;
 
   try {
     const product = await Product.findOne({ _id: pid });
 
     if (!product) {
       return next(new ErrorHandler('Product not found', 404));
     }
 
     const reviewIndex = product.reviews.findIndex(
       (rev) => rev.user.toString() === req.user._id.toString()
     );
 
     if (reviewIndex === -1) {
       return next(new ErrorHandler('Review not found', 404));
     }
 
     // Remove the review from the array
     product.reviews.splice(reviewIndex, 1);
     product.numOfReviews = product.reviews.length;
 
     // Recalculate average rating
     let avg = 0;
     product.reviews.forEach((review) => {
       avg += review.rating;
     });
 
     product.rating = product.reviews.length > 0 ? avg / product.reviews.length : 0;
 
     // Save the updated product
     await product.save({ validateBeforeSave: false });
 
     return res.status(200).send(product);
   } catch (error) {
      console.log(error)
     return next(new ErrorHandler('An error occurred while deleting the review', 500));
   }
 };
 

 // Get all reviews 

 export const getAllReviews = async(req,res)=>{
   try{
      console.log('called')
      const {pid} = req.body;
   const all = await Product.findOne({_id:pid});
   console.log(all)
     res.send(all.reviews);
   }catch(e){
      res.send(e)
   }
 }