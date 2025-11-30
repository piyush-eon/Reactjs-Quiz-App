

# Quiz App – Advanced Settings & Scoring Update

## New Features

### **1. Marking Scheme (Normal / Negative)**

* Added on Home screen.
* New `score.js` handles scoring; wrong answers can reduce score below 0.

### **2. Advanced Quiz Settings**

* New modal (`Popup.js`) with:

  * Per-question timer
  * Allow/disallow skipping
  * Custom question count
* All values saved in `localStorage`.

### **3. Timer Integration**

* Timer shown in Question.
* Auto-marks wrong and moves to next on timeout.

### **4. Skip Controls**

* If skipping is disabled, Next is blocked.
* Button label switches between **Skip / Next**.

### **5. Question Count Support**

* `App.js` uses the selected count.
* UI shows **Question X / Y**.

### **6. OpenTDB Session Token**

* Added to avoid repeats.
* Auto-resets when token is exhausted.

### **7. Results Page Update**

* Shows **Correct** and **Wrong** counts (via router state).

