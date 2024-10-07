import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    rating: {
      type: Number,
      default: 3,
    },
    images: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    category: {
      type: String,
    },
    stock: {
      type: String,
    },
    numOfReviews: {
      type: String,
    },
    reviews: [
      {
        user:{
          type:mongoose.Schema.ObjectId,
          ref:'User',
          required:true
        },
        name: {
          type: String,
        },
        rating: {
          type: Number,
        },
        comment: {
          type: String,
        },
      },
    ],
    user:{
      type:mongoose.Schema.ObjectId,
      ref:'User',
      required:true
    },
  },
  {
    timestamps: true,
  }
);

// Create an index on the rating field
// productSchema.index({ rating: 1 });   // single query
// productSchema.index({ rating: 1 },{gender:male});  // multi query
// productSchema.index({ rating: 1 },{unique: true},);   // duplicacy not allowed
// productSchema.index({ age: 1 },{partialFilterExpression:{age:{$gte:22}}}); 
// productSchema.index({ name: 1 },{partialFilterExpression:{age:{$exists:true}}});
// productSchema.index({ expires: 1 },{expireAfterSeconds: 3600});     // works on date field only
// productSchema.index({ name: 1 },{_id:0,name:1});  // compund query

//multiple query

export const Product = mongoose.model.Product || mongoose.model("Product", productSchema);
