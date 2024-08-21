import { Product } from "../models/products.js"
import { ErrorHandler } from "../utils/errorHandler.js";

export const createProducts = async(req,res)=>{
   console.log(req.body);
   const product = await Product.create(req.body);
   res.status(200).send(product)
}

export const getAllProducts = async(req,res)=>{
   const getData =  Product.find()
   res.status(200).send(getData)
}

export const getAllProductsById = async(req,res,next)=>{
   const getData = await Product.findById(req.params.id)
   if(!getData){
      return next(new ErrorHandler('product not found',400))
   }
   res.status(200).send(getData)
}

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

//66c475f50ae8c63db665e1a8