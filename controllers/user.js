import userModel from "../models/user.js";
import bcrypt from "bcryptjs";
import cookieParser from 'cookie-parser';


const profile = async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      if (user) {
        res.json({ userName: user.username, image: user.savedPic, userEmail: user.email, aadhar: user.aadharNo });
   } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  export {profile};