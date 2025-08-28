import mongoose from 'mongoose';

const quizSchemma = new mongoose.Schema({
    uid:{
        type : String,
        required: true,
        unique: true
    },
    username:{
        type : String,
        required: true
    },
    score:{
        type: Number,
        required: true
    }
    },
    {
        timesstamps: true
    }
    )

    export const Quiz  = mongoose.model("quiz",quizSchemma)