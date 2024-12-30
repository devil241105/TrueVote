import './config/db.js';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
// import postRoutes from './routes/post.js';
// import profileRoutes from './routes/profile.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.js';
import electionRoutes from './routes/election.js';
import partyRoutes from './routes/parties.js';

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


app.use('/auth', authRoutes)
app.use('/user',userRoutes)
app.use('/election',electionRoutes)
app.use('/party',partyRoutes)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}).on('error', (err) => {
    console.error("Failed to start server:", err);
});
