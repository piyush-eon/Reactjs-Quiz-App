import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./Quiz.css";

const Quiz = ({ name, questions, currQues, setCurrQues }) => {
  const [selected, setSelected] = useState();
  const [options, setOptions] = useState();

  useEffect(() => {
    setOptions(
      questions &&
        handleShuffle([
          questions[currQues]?.correct_answer,
          ...questions[currQues]?.incorrect_answers,
        ])
    );
  }, [currQues, questions]);

  console.log(questions);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="quiz">
      <span className="subtitle">Welcome, {name}</span>

      {questions && (
        <>
          <div className="quizInfo">
            <span>{questions[currQues].category}</span>
            <span>{questions[currQues].difficulty}</span>
          </div>
          <div className="question">
            <h1>Question {currQues + 1} :</h1>
            <div className="singleQuestion">
              <h2>{questions[currQues].question}</h2>
              <div className="options">
                {options &&
                  options.map((i) => (
                    <button
                      className={`singleOption ${selected === i && `select`}`}
                      key={i}
                      onClick={() => setSelected(i)}
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
                >
                  Quit
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ width: 185 }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
