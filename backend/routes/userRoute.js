import express from 'express';
import {  forgotPass, loginUser, passwordReset, registerUser } from '../controllers/userController.js';
import { logoutUser } from './../controllers/userController.js';
import { isAuthenticated,isAdmin} from './../middleware/isAuthenticated.js';

const router = express.Router()
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/forgot').post(forgotPass)
router.route('/password/reset/:token').put(passwordReset)

// router.route("/me").get(isAuthenticated, getUserDetails);

// router.route("/password/update").put(isAuthenticated, updatePassword);

// router.route("/me/update").put(isAuthenticated, updateProfile);
// router
//   .route("/admin/users")
//   .get(isAuthenticated, isAdmin(), getAllUser);

// router
//   .route("/admin/user/:id")
//   .get(isAuthenticated, isAdmin(), getSingleUser)
//   .put(isAuthenticated, isAdmin(), updateUserRole)
//   .delete(isAuthenticated, isAdmin(), deleteUser);

export default router;

