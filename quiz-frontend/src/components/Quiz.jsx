import React, { useEffect, useRef, useState } from "react";
import './Quiz.css';
import axios from 'axios';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState({});
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [name, setName] = useState("");
  const [uid, setUid] = useState("");

  const option1 = useRef(null), option2 = useRef(null), option3 = useRef(null), option4 = useRef(null);
  const option_arr = [option1, option2, option3, option4];

  useEffect(() => {
    axios.get("http://localhost:3000/api/quiz/questions")
      .then((res) => {
        setQuestions(res.data.data);
        setQuestion(res.data.data[0]);
      });
  }, []);

  

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setScore(prev => prev + 1);
      } else {
        e.target.classList.add("Incorrect");
        option_arr[question.ans - 1].current.classList.add("correct");
      }
      setLock(true);
    }
  };

  const next = () => {
    if (!lock) return;

   if (index === questions.length - 1) {
  // ✅ Check required fields before submission
  if (!uid.trim() || !name.trim()) {
    alert("Please enter your name and UID before starting the quiz.");
    return;
  }

  setResult(true);

  axios.post("http://localhost:3000/api/quiz/submit", {
  uid: uid.trim(),
  username: name.trim(),
  score
})
.then((res) => {
  console.log(" Backend Response:", res.data);
  alert(" Score submitted!");
})
.catch((err) => {
  if (err.response) {
    console.error("Server Error:", err.response.data);
    alert("Failed to store score: " + err.response.data.message);
  } else {
    console.error(" Network Error:", err.message);
    alert("Network error while submitting score");
  }
});



  return;
}


    setIndex(prev => prev + 1);
    setQuestion(questions[index + 1]);
    setLock(false);
    option_arr.forEach(opt => {
      opt.current.classList.remove("correct", "Incorrect");
    });
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setQuestion(questions[0]);
    setLock(false);
    setResult(false);
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      {!result && index === 0 && (
        <>
          <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          <input type="text" placeholder="UID" value={uid} onChange={e => setUid(e.target.value)} />
        </>
      )}

      {!result ? (
        <>
          <h2>{index + 1}. {question.Questions}</h2>
          <ul>
            <li ref={option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
            <li ref={option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
            <li ref={option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
            <li ref={option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
          </ul>
          <button onClick={next}>Next</button>
        </>
      ) : (
        <>
          <h2>Score: {score} / {questions.length}</h2>
          <button onClick={reset}>Try Again</button>
        </>
      )}
    </div>
  );
};

export default Quiz;
