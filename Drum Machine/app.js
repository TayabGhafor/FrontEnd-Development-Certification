const sounds = [
  { key: "Q", label: "Heater 1", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
  { key: "W", label: "Heater 2", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
  { key: "E", label: "Heater 3", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
  { key: "A", label: "Heater 4", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
  { key: "S", label: "Clap", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
  { key: "D", label: "Open-HH", src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
  { key: "Z", label: "Kick-n'-Hat", src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
  { key: "X", label: "Kick", src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
  { key: "C", label: "Closed-HH", src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" },
];

const App = () => {
  const [display, setDisplay] = React.useState("");

  const playSound = (key, label) => {
    const audio = document.getElementById(key);
    audio.currentTime = 0;
    audio.play();
    setDisplay(label);
  };

  const handleKeyPress = React.useCallback((event) => {
    const sound = sounds.find((s) => s.key === event.key.toUpperCase());
    if (sound) {
      playSound(sound.key, sound.label);
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div id="drum-machine">
      <div id="display">{display || "Press a key"}</div>
      <div className="drum-pads">
        {sounds.map((sound) => (
          <div
            key={sound.key}
            id={sound.label}
            className="drum-pad"
            onClick={() => playSound(sound.key, sound.label)}
          >
            {sound.key}
            <audio id={sound.key} className="clip" src={sound.src}></audio>
          </div>
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
