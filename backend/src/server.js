import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.route.js';
import { connectDB }from './lib/db.js';
import messageRouter from './routes/message.route.js';


const app = express();

dotenv.config();


//to do cors configuration

// app.use(express.json());
// app.use(cookieParser());

app.use("/api/users",authRouter);
app.use("/api/messages",messageRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);

    connectDB();
});
