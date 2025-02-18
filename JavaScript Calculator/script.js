const App = () => {
  const [input, setInput] = React.useState("0");
  const [formula, setFormula] = React.useState("");
  const [evaluated, setEvaluated] = React.useState(false);

  const handleInput = (value) => {
    if (evaluated) {
      setFormula(value.match(/[0-9.]/) ? value : input + value);
      setInput(value);
      setEvaluated(false);
      return;
    }

    if (value === "0" && input === "0") return; // Prevent multiple leading zeros
    if (value === "." && input.includes(".")) return; // Prevent multiple decimals

    setInput((prev) => (prev === "0" || /[+\-*/]/.test(input) ? value : prev + value));
    setFormula((prev) => (prev === "0" && value !== "." ? value : prev + value));
  };

  const handleOperator = (operator) => {
    if (evaluated) {
      setFormula(input + operator);
      setInput(operator);
      setEvaluated(false);
      return;
    }

    const lastChar = formula[formula.length - 1];

    if (/[+\-*/]/.test(lastChar)) {
      if (operator === "-" && lastChar !== "-") {
        setFormula((prev) => prev + operator); // Allow negative sign
        setInput(operator);
      } else if (/[+\-*/]{2}/.test(formula.slice(-2))) {
        // Replace last two operators (e.g., "5 + *" becomes "5 *")
        setFormula((prev) => prev.slice(0, -2) + operator);
        setInput(operator);
      } else {
        // Replace last single operator (e.g., "5 +" becomes "5 *")
        setFormula((prev) => prev.slice(0, -1) + operator);
        setInput(operator);
      }
    } else {
      setFormula((prev) => prev + operator);
      setInput(operator);
    }
  };

  const handleClear = () => {
    setInput("0");
    setFormula("");
    setEvaluated(false);
  };

  const handleEvaluate = () => {
    try {
      // Use `eval` to calculate the result while avoiding invalid expressions
      const result = eval(formula.replace(/--/g, "+"))
        .toFixed(4) // Ensure precision up to 4 decimal places
        .replace(/\.?0+$/, ""); // Remove trailing zeros and unnecessary decimal points
      setInput(result);
      setFormula(formula + " = " + result);
      setEvaluated(true);
    } catch (error) {
      setInput("Error");
      setFormula("");
      setEvaluated(true);
    }
  };

  return (
    <div id="calculator">
      <div id="display">{input}</div>
      <div className="buttons">
        <button id="clear" onClick={handleClear}>AC</button>
        <button id="divide" onClick={() => handleOperator("/")}>/</button>
        <button id="multiply" onClick={() => handleOperator("*")}>*</button>
        <button id="seven" onClick={() => handleInput("7")}>7</button>
        <button id="eight" onClick={() => handleInput("8")}>8</button>
        <button id="nine" onClick={() => handleInput("9")}>9</button>
        <button id="subtract" onClick={() => handleOperator("-")}>-</button>
        <button id="four" onClick={() => handleInput("4")}>4</button>
        <button id="five" onClick={() => handleInput("5")}>5</button>
        <button id="six" onClick={() => handleInput("6")}>6</button>
        <button id="add" onClick={() => handleOperator("+")}>+</button>
        <button id="one" onClick={() => handleInput("1")}>1</button>
        <button id="two" onClick={() => handleInput("2")}>2</button>
        <button id="three" onClick={() => handleInput("3")}>3</button>
        <button id="equals" onClick={handleEvaluate}>=</button>
        <button id="zero" onClick={() => handleInput("0")} style={{ gridColumn: "span 2" }}>0</button>
        <button id="decimal" onClick={() => handleInput(".")}>.</button>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
