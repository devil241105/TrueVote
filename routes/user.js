import express from 'express'
import { profile } from '../controllers/user.js'

const userRoutes = express.Router()

userRoutes.get('/profile/:id',profile)

export default userRoutes