import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
    },
    isVerified:{
        type:Boolean,
        default:false  

        
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Data,
    verifyToken:String,
    verifyTokenExpiry:Date
  },
  { timestamps: true }
);


const User = mongoose.models.users || mongoose.model("users",userSchema)
export default User