import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {connectDB}from './database/db.js';
import router from './routes/result.routes.js';

dotenv.config(
    {
        path:"./env"
    }
);



const corsOptions = {
  origin: 'http://localhost:5173', // allow your React frontend
  methods: ['GET', 'POST'],
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Quiz API Running');
});


app.use('/api/quiz', router);

connectDB();

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
