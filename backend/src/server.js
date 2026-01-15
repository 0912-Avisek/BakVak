import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import { connectDB }from './lib/db.js';


const app = express();

dotenv.config();

app.use(express.json());

app.use("/auth",authRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
 //   connectDB();
});
