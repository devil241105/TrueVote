import express from 'express'
import { Login,Register, Logout, forgetPassword} from '../controllers/auth.js'
import { upload } from '../config/cloudinary.js'

const authRoutes = express.Router()

authRoutes.post('/register',upload, Register)
authRoutes.post('/login', Login)
authRoutes.post('/logout', Logout)
authRoutes.post('/forget/password', forgetPassword)

export default authRoutes