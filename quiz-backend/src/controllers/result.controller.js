import { Quiz } from '../models/result.model.js';
import { questions } from '../data/data.js';

export const getQuestions = async (req, res) => {
  res.status(200).json({ success: true, data: questions });
};

export const submitQuiz = async (req, res) => {

  const { uid, username, score } = req.body;

  if (!uid || !username || score == null) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  const result = await Quiz.create({ uid, username, score });

  return res.status(201).json({ success: true, data: result });
};
