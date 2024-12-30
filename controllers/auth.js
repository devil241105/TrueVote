import userModel from "../models/user.js";
import bcrypt from "bcryptjs";
import cookieParser from 'cookie-parser';
import 'dotenv/config';

const Register = async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.file.filename)
        const { username, email, password, aadharNo} = req.body;
        let isAdmin=false;
        if(email=='ankitkumar241105@getMaxListeners.com'){
            isAdmin = true;
        }
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(303).json({ success: false, message: "User already exists. Please log in." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
    let savedPic = { public_id: "", url: "" }; 
    if (req.file) {
      savedPic = {
        public_id: req.file.filename,
        url: req.file.path,
      };
    }
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
            aadharNo,
            savedPic,
            isAdmin,
        });

        await newUser.save();

        res.status(200).json({ success: true, message: "User registered successfully", User: newUser });
    } catch (error) {
        console.error("Registration error:", error.message);  // Log the specific error message
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required." });
        }

        const foundUser = await userModel.findOne({ email });
        if (!foundUser) {
            return res.status(404).json({ success: false, message: "User not found. Please register." });
        }

        console.log("Retrieved user:", foundUser); // Debug logging
        console.log("Stored hashed password:", foundUser.password); 

        const comparePassword = await bcrypt.compare(password, foundUser.password); 
        if (!comparePassword) {
            return res.status(401).json({ success: false, message: "Invalid Password" });
        }

        const userId = foundUser._id;
        res.cookie('userId', userId, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 24 * 60 * 60 * 1000, 
            sameSite: 'Strict',
        });

        return res.status(200).json({ success: true, message: "Login successful", user: foundUser });
    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

const Logout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({ success: true, message: "User logged out successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const forgetPassword = async (req,res) => {
    try{
        const user = await userModel.findOne({email:req.body.email});

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const resetPasswordToken = user.getResetPasswordToken();
        await user.save();
        const resetUrl = `${req.protocol}://${req.get("host")}/auth/password/reset/${resetPasswordToken}`;
        const message = `reset your password by clicking on the link below \n\n ${resetUrl}`

        try{
            await sendEmail({
                email: user.email,
                subject: "Reset Password",
                message,
            });
        return res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        });
        }catch(error){
            user.resetPasswordToken=undefined;
            user.resetPasswordExpire=undefined;
            await user.save();

            res.status(500).json({
                success: false,
                message: error.message,
            });
        }


    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


// const profile = async (req, res) => {
//     try {
//       const user = await user.findById(req.params.id);
//       if (user) {
//         res.json({ userName: user.username, image: user.savedPic, userEmail: user.email,aadhar: user.aadharNo });
//       } else {
//         res.status(404).json({ message: "User not found" });
//       }
//     } catch (error) {
//       res.status(500).json({ message: "Server error" });
//     }
//   };


export { Register, Login, Logout, forgetPassword};