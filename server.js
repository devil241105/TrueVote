import './config/db.js';
import express from 'express';
import cors from 'cors';
import AutRoutes from './routes/auth.js';
// import postRoutes from './routes/post.js';
// import profileRoutes from './routes/profile.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.js';

const app = express();
const port = 3000;


var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
    credentials: true,
}


app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());


app.use('/auth', AutRoutes)
// app.use('', postRoutes)
// app.use('', profileRoutes)
app.use('/user',userRoutes)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}).on('error', (err) => {
    console.error("Failed to start server:", err);
});
