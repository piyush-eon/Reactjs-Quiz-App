import { Button } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import "./Question.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { getNextScore } from "../Score/Score";

const decode = (s) => {
  try { return decodeURIComponent(s); } catch { return s; }
};

const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
  setQuestions,
  setCorrectCount,
  setWrongCount,
  correctCount,
  wrongCount,
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  const history = useHistory();

  const allowSkip = (localStorage.getItem("allowSkip") ?? "true") !== "false";
  const perQuestionTimer = Number(localStorage.getItem("quizTimerSeconds") || 0);
  const [timeLeft, setTimeLeft] = useState(perQuestionTimer);
  const timerRef = useRef(null);

  useEffect(() => {
    if (perQuestionTimer > 0) {
      setTimeLeft(perQuestionTimer);
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            handleTimeout();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currQues, perQuestionTimer]);

  const stopTimer = () => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } };

  const handleSelect = (i) => {
    if (selected === i && selected === correct) return "select";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
  };

  const handleCheck = (i) => {
    setSelected(i);
    stopTimer();
    const isCorrect = i === correct;
    setScore((prev) => getNextScore(prev, isCorrect));
    if (isCorrect) setCorrectCount((c) => c + 1);
    else setWrongCount((w) => w + 1);
    setError(false);
  };

  const goNext = () => {
    const isLast = currQues >= (questions?.length ?? 0) - 1;
    if (isLast) {
      history.push("/result", { score, correctCount, wrongCount });
    } else {
      setCurrQues(currQues + 1);
      setSelected(undefined);
      setError(false);
    }
  };

  const handleNext = () => {
    if (!selected && !allowSkip) {
      setError("Please select an option first");
      return;
    }
    goNext();
  };

  const handleTimeout = () => {
    if (selected == null) {
      setScore((prev) => getNextScore(prev, false));
      setWrongCount((w) => w + 1);
      goNext();
    }
  };

  const handleQuit = () => {
    stopTimer();
    setCurrQues(0);
    setQuestions();
  };

  const totalQ = questions?.length ?? 0;

  return (
    <div className="question">
      <div className="question__header">
        <h1>
          Question {currQues + 1} / {totalQ}
        </h1>
        {perQuestionTimer > 0 && (
          <div className="timer" aria-live="polite">
            Time left: {timeLeft}s
          </div>
        )}
      </div>

      <div className="singleQuestion">
        <h2>{decode(questions[currQues].question)}</h2>
        <div className="options">
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {options &&
            options.map((i) => (
              <button
                className={`singleOption  ${selected && handleSelect(i)}`}
                key={i}
                onClick={() => handleCheck(i)}
                disabled={!!selected}
              >
                {i}
              </button>
            ))}
        </div>
        <div className="controls">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            href="/"
            onClick={handleQuit}
          >
            Quit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
          >
            {currQues >= totalQ - 1 ? "Submit" : allowSkip ? "Skip / Next" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;
