import mongoose from 'mongoose';
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config({
    path:"./env"
});

const DB_NAME = "quizScores";
const connectDB = async() =>{
    try{
         const connectionE = await mongoose.connect(`${process.env.MONGODB_URI}`,{
            dbName: 'quizScores',
         })
         console.log(`"MongoDB connected !! DB HOST: " ${connectionE.connection.host} `);
    }
    catch(err){
        console.error("moongoose connection error", err);
        process.exit(1)
    }
}

export { connectDB, DB_NAME };


