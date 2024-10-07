import mongoose from "mongoose";
import validator from "validator";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    // validate:[validator.isStrongPassword,'ni h'],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword= async function(enterPassword){
   return await bcrypt.compare(enterPassword,this.password);
}

userSchema.methods.jwtToken = function(){
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:'1d'
  })
}

userSchema.methods.resetToken =  function() {
    //crypto logic
    const resetToken = crypto.randomBytes(20).toString('hex')
  
    
    
    //crypto hash
    this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
    
    this.resetPasswordExpire = new Date(Date.now() + 15*60*1000);
    console.log('method m hi hu');
    console.log( this.resetPasswordToken);
    
    return resetToken;

}

export const User = mongoose.model.User || mongoose.model('User',userSchema)