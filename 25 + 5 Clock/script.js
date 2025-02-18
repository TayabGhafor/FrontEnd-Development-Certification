document.addEventListener("DOMContentLoaded", () => {
  const timerLabel = document.getElementById("timer-label");
  const timeLeft = document.getElementById("time-left");
  const startStopButton = document.getElementById("start_stop");
  const resetButton = document.getElementById("reset");
  const sessionLengthElement = document.getElementById("session-length");
  const breakLengthElement = document.getElementById("break-length");
  const beep = document.getElementById("beep");

  let sessionLength = 25;
  let breakLength = 5;
  let timerRunning = false;
  let currentTimerType = "Session";
  let timerInterval;
  let timeRemaining = sessionLength * 60;

  // Format time in mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Update displayed time
  const updateTimeDisplay = () => {
    timeLeft.textContent = formatTime(timeRemaining);
  };

  // Handle timer completion
  const handleTimerCompletion = () => {
    beep.currentTime = 0; // Reset audio to the start
    beep.play(); // Play beep sound
    if (currentTimerType === "Session") {
      currentTimerType = "Break";
      timeRemaining = breakLength * 60;
      timerLabel.textContent = "Break";
    } else {
      currentTimerType = "Session";
      timeRemaining = sessionLength * 60;
      timerLabel.textContent = "Session";
    }
    updateTimeDisplay();
  };

  // Timer countdown
  const runTimer = () => {
    if (timeRemaining > 0) {
      timeRemaining -= 1;
      updateTimeDisplay();
    } else {
      handleTimerCompletion();
    }
  };

  // Start/Stop timer
  startStopButton.addEventListener("click", () => {
    if (timerRunning) {
      clearInterval(timerInterval);
    } else {
      timerInterval = setInterval(runTimer, 1000);
    }
    timerRunning = !timerRunning;
  });

  // Reset timer
  resetButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerRunning = false;
    currentTimerType = "Session";
    sessionLength = 25;
    breakLength = 5;
    timeRemaining = sessionLength * 60;
    timerLabel.textContent = "Session";
    sessionLengthElement.textContent = sessionLength;
    breakLengthElement.textContent = breakLength;
    updateTimeDisplay();
    beep.pause();
    beep.currentTime = 0;
  });

  // Increment/Decrement session length
  document.getElementById("session-increment").addEventListener("click", () => {
    if (sessionLength < 60 && !timerRunning) {
      sessionLength += 1;
      sessionLengthElement.textContent = sessionLength;
      if (currentTimerType === "Session") {
        timeRemaining = sessionLength * 60;
        updateTimeDisplay();
      }
    }
  });

  document.getElementById("session-decrement").addEventListener("click", () => {
    if (sessionLength > 1 && !timerRunning) {
      sessionLength -= 1;
      sessionLengthElement.textContent = sessionLength;
      if (currentTimerType === "Session") {
        timeRemaining = sessionLength * 60;
        updateTimeDisplay();
      }
    }
  });

  // Increment/Decrement break length
  document.getElementById("break-increment").addEventListener("click", () => {
    if (breakLength < 60 && !timerRunning) {
      breakLength += 1;
      breakLengthElement.textContent = breakLength;
    }
  });

  document.getElementById("break-decrement").addEventListener("click", () => {
    if (breakLength > 1 && !timerRunning) {
      breakLength -= 1;
      breakLengthElement.textContent = breakLength;
    }
  });

  // Initialize display
  updateTimeDisplay();
});
