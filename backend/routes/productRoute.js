
import  express  from 'express';
import { createProducts, deleteProductsById, getAllProducts, getAllProductsById, updateProductById } from './../controllers/productController.js';

const router = express.Router();

// router.get('/products',getAllProducts);

router.route('/products').get(getAllProducts).post(createProducts) // it can handle all routes
router.route('/products/:id').get(getAllProductsById).delete(deleteProductsById).put(updateProductById)

export default router;