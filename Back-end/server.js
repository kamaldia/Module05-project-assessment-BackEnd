import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import userRouter from './Routes/User.js'

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use('/api/user', userRouter);

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`DB connected and Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to the database:", err);
  });
