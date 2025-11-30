import { CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import Question from "../../components/Question/Question";
import "./Quiz.css";

const decode = (s) => {
  try { return decodeURIComponent(s); } catch { return s; }
};

const Quiz = ({ name, questions, score, setScore, setQuestions }) => {
  const [options, setOptions] = useState();
  const [currQues, setCurrQues] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  useEffect(() => {
    if (!questions) return;
    const correct = decode(questions[currQues]?.correct_answer || "");
    const incorrect = (questions[currQues]?.incorrect_answers || []).map(decode);
    setOptions(handleShuffle([correct, ...incorrect]));
  }, [currQues, questions]);

  const handleShuffle = (arr) => arr.sort(() => Math.random() - 0.5);

  return (
    <div className="quiz">
      <span className="subtitle">Welcome, {name}</span>

      {questions ? (
        <>
          <div className="quizInfo">
            <span>{decode(questions[currQues].category)}</span>
            <span>Score : {score}</span>
          </div>
          <Question
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
            options={options}
            correct={decode(questions[currQues]?.correct_answer || "")}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
            correctCount={correctCount}
            wrongCount={wrongCount}
            setCorrectCount={setCorrectCount}
            setWrongCount={setWrongCount}
          />
        </>
      ) : (
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}
        />
      )}
    </div>
  );
};

export default Quiz;
