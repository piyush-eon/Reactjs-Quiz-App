import { Button, MenuItem, TextField } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Categories from "../../Data/Categories";
import AdvancedPopup from "../../components/Popup/Popup";
import "./Home.css";

const Home = ({ name, setName, fetchQuestions }) => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);
  const [markingScheme, setMarkingScheme] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const history = useHistory();

  const handleSubmit = () => {
    if (!category || !difficulty || !name || !markingScheme) {
      setError(true);
      return;
    } else {
      setError(false);
      localStorage.setItem("markingScheme", markingScheme);
      fetchQuestions(category, difficulty);
      history.push("/quiz");
    }
  };

  return (
    <div className="content">
      <div className="settings">
        <span style={{ fontSize: 30 }}>Quiz Settings</span>
        <div className="settings__select">
          {error && <ErrorMessage>Please Fill all the feilds</ErrorMessage>}
          <TextField
            style={{ marginBottom: 25 }}
            label="Enter Your Name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            select
            label="Select Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 30 }}
          >
            {Categories.map((cat) => (
              <MenuItem key={cat.category} value={cat.value}>
                {cat.category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Select Difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 30 }}
          >
            <MenuItem key="Easy" value="easy">
              Easy
            </MenuItem>
            <MenuItem key="Medium" value="medium">
              Medium
            </MenuItem>
            <MenuItem key="Hard" value="hard">
              Hard
            </MenuItem>
          </TextField>
          <TextField
            select
            label="Select Marking Scheme"
            value={markingScheme}
            onChange={(e) => setMarkingScheme(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 30 }}
          >
            <MenuItem key="Normal" value="normal">
              Normal Marking
            </MenuItem>
            <MenuItem key="Negative" value="negative">
              Negative Marking
            </MenuItem>
          </TextField>

          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            <Button
              variant="outlined"
              color="default"
              size="large"
              onClick={() => setShowAdvanced(true)}
            >
              Advanced Quiz Settings
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
            >
              Start Quiz
            </Button>
          </div>
        </div>
      </div>

      <AdvancedPopup
        open={showAdvanced}
        onClose={() => setShowAdvanced(false)}
        onApply={() => setShowAdvanced(false)}
      />

      <img src="/quiz.svg" className="banner" alt="quiz app" />
    </div>
  );
};

export default Home;
