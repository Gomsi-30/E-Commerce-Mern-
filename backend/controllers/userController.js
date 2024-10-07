import { User } from "../models/user.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { giveToken } from "../utils/giveToken.js";
import { sendEmail } from "../config/nodemailer.js";
import crypto from "crypto";

// Register a user
export const registerUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(500).send({ msg: "already exist" });
    }
    const newUser = await User.create({ ...req.body });
    giveToken(newUser, 200, res);
  } catch (e) {
    console.log(e);
    return res.send(e);
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("User not found", 401));
    }
    const isMatched = user.comparePassword(password);
    if (!isMatched) {
      return next(new ErrorHandler("Invalid username and password", 401));
    }
    giveToken(user, 200, res);
  } catch (e) {
    console.log(e);
    return res.send(e);
  }
};

// Logout user
export const logoutUser = (req, res) => {
  res.cookie("token", null, {
    maxAge: 0,
    httpOnly: true,
  });
  res.status(200).send({ success: true, msg: "Logout succesfully" });
};

//  Forgot password
export const forgotPass = async (req, res) => {
  console.log("chla");
  const user = await User.findOne({ email: req.body.email });
  console.log(user);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  const resetPassToken = user.resetToken();
  console.log(resetPassToken);

  user.save({ validateBeforeSave: false });

  const url = `http://localhost:3001/password/reset/${resetPassToken}`;
  try {
    await sendEmail({
      email: user.email,
      message: `Your request to reser your password is successfull ${url}`,
      subject: "E-commerce password reset token",
    });

    return res.status(200).send({
      success: true,
      message: `Email sent successfully to ${user.email}`,
    });
  } catch (e) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.save({ validateBeforeSave: false });
    console.log("e");
  }
};

// change password

export const passwordReset = async (req, res, next) => {
  try {
    // Token ko hash karna
    const tok = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    // User ko token aur expire time ke sath dhoondhna
    const user = await User.findOne({
      resetPasswordToken: tok,
      resetPasswordExpire: { $gt: Date.now() },
    });
    console.log(user);

    if (!user) {
      return next(new ErrorHandler("Token Mismatch", 401));
    }

    if (req.body.password !== req.body.confirmPassword) {
      return next(
        new ErrorHandler("Password and Confirm password do not match", 404)
      );
    }

    // User ka password update karna aur reset tokens clear karna
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return res.send({ message: "Password Changed Successfully", data: user });
  } catch (error) {
    // Agar koi error aaye to usko handle karein
    return next(new ErrorHandler(error.message, 500));
  }
};
// Get User Detail
export const getUserDetails = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
};

// update User password
export const updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
};

// update User Profile
export const updateProfile = async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
  });

  res.status(200).json({
    success: true,
  });
};


