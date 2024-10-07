
import  express  from 'express';
import { createProducts, deleteProductsById, deleteReview, getAllProducts, getAllProductsById, getAllReviews, review, updateProductById } from './../controllers/productController.js';
import { isAdmin, isAuthenticated } from '../middleware/isAuthenticated.js';

const router = express.Router();

// router.get('/products',getAllProducts);

router.route('/products').get(getAllProducts).post(isAuthenticated,createProducts) // it can handle all routes
router.route('/products/:id').get(getAllProductsById).delete(isAuthenticated,isAdmin,deleteProductsById).put(isAuthenticated,updateProductById)
router.route("/review").put(isAuthenticated, review).delete(isAuthenticated,deleteReview).get(getAllReviews);

// router
//   .route("/reviews")
//   .get(getProductReviews)
//   .delete(isAuthenticated, deleteReview);
  
export default router;