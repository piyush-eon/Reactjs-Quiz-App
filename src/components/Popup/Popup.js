import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  TextField,
} from "@material-ui/core";

const timerOptions = [
  { label: "No Timer", value: 0 },
  { label: "15 seconds/question", value: 15 },
  { label: "30 seconds/question", value: 30 },
  { label: "45 seconds/question", value: 45 },
  { label: "60 seconds/question", value: 60 },
  { label: "90 seconds/question", value: 90 },
];

const skipOptions = [
  { label: "Allow Skipping", value: "true" },
  { label: "Do Not Allow Skipping", value: "false" },
];

export default function AdvancedPopup({ open, onClose, onApply }) {
  const [timerSeconds, setTimerSeconds] = useState(
    Number(localStorage.getItem("quizTimerSeconds") || 0)
  );
  const [allowSkip, setAllowSkip] = useState(
    String(localStorage.getItem("allowSkip") || "true")
  );
  const [questionAmount, setQuestionAmount] = useState(
    Number(localStorage.getItem("questionAmount") || 10)
  );

  const handleApply = () => {
    localStorage.setItem("quizTimerSeconds", String(timerSeconds));
    localStorage.setItem("allowSkip", String(allowSkip));
    localStorage.setItem("questionAmount", String(questionAmount));
    onApply?.({ timerSeconds, allowSkip: allowSkip === "true", questionAmount });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Advanced Quiz Settings</DialogTitle>
      <DialogContent dividers>
        <TextField
          select
          label="Timer"
          value={timerSeconds}
          onChange={(e) => setTimerSeconds(Number(e.target.value))}
          variant="outlined"
          fullWidth
          style={{ marginBottom: 20 }}
        >
          {timerOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Skipping"
          value={allowSkip}
          onChange={(e) => setAllowSkip(String(e.target.value))}
          variant="outlined"
          fullWidth
          style={{ marginBottom: 20 }}
        >
          {skipOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          type="number"
          label="Number of Questions"
          value={questionAmount}
          onChange={(e) =>
            setQuestionAmount(Math.max(1, Number(e.target.value || 1)))
          }
          variant="outlined"
          fullWidth
          inputProps={{ min: 1, max: 100 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="default" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleApply();
            onClose?.();
          }}
          color="primary"
          variant="contained"
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
