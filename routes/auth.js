import express from 'express'
import { Login,Register, Logout, forgetPassword} from '../controllers/auth.js'

const authRoutes = express.Router()

authRoutes.post('/register', Register)
authRoutes.post('/login', Login)
authRoutes.post('/logout', Logout)
authRoutes.post('/forget/password', forgetPassword)

export default authRoutes