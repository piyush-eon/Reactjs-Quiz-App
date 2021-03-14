import { Button, MenuItem, TextField } from "@material-ui/core";
import { useState } from "react";
import "./Home.css";

const Home = () => {
  const [category, setCategory] = useState("Any Category");
  const [diff, setDiff] = useState("Any Difficulty");

  return (
    <div className="content">
      <div className="settings">
        <span style={{ fontSize: 30 }}>Quiz Settings</span>
        <div className="settings__select">
          <TextField
            style={{ marginBottom: 25 }}
            label="Enter Your Name"
            variant="outlined"
          />
          <TextField
            select
            label="Select Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 30 }}
          >
            <MenuItem key="Any Category" value="Any Category">
              Any Category
            </MenuItem>
            <MenuItem key="Movies" value="Movies">
              Movies
            </MenuItem>
            <MenuItem key="Computers" value="Computers">
              Computers
            </MenuItem>
          </TextField>
          <TextField
            select
            label="Select Difficulty"
            value={diff}
            onChange={(e) => setDiff(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 30 }}
          >
            <MenuItem key="Any Difficulty" value="Any Difficulty">
              Any Difficulty
            </MenuItem>
            <MenuItem key="Easy" value="Easy">
              Easy
            </MenuItem>
            <MenuItem key="Medium" value="Medium">
              Medium
            </MenuItem>
            <MenuItem key="Hard" value="Hard">
              Hard
            </MenuItem>
          </TextField>
          <Button variant="contained" color="primary">
            Start Quiz
          </Button>
        </div>
      </div>
      <img src="/quiz.svg" className="banner" alt="quiz app" />
    </div>
  );
};

export default Home;
