import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import "./Result.css";

const Result = ({ name }) => {
  const history = useHistory();
  const location = useLocation();
  const { score = 0, correctCount = 0, wrongCount = 0 } = location.state || {};

  useEffect(() => {
    if (!name) {
      history.push("/");
    }
  }, [name, history]);

  return (
    <div className="result">
      <span className="title">Final Score : {score}</span>
      <div className="details">
        <p>Correct Answers: {correctCount}</p>
        <p>Wrong Answers: {wrongCount}</p>
      </div>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        style={{ alignSelf: "center", marginTop: 20 }}
        href="/"
      >
        Go to homepage
      </Button>
    </div>
  );
};

export default Result;
