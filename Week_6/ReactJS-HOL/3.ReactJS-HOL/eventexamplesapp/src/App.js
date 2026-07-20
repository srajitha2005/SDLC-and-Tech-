import { useState } from "react";
import CurrencyConvertor from "./Components/CurrencyConvertor";

function App() {

  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const sayHello = () => {
    alert("Hello! Have a nice day.");
  };

  const increase = () => {
    increment();
    sayHello();
  };

  const sayWelcome = (msg) => {
    alert(msg);
  };

  const syntheticEvent = () => {
    alert("I was clicked");
  };

  return (
    <div style={{ margin: "20px" }}>

      <h1>Counter : {count}</h1>

      <button onClick={increase}>
        Increment
      </button>

      <button onClick={decrement}>
        Decrement
      </button>

      <br /><br />

      <button onClick={() => sayWelcome("Welcome")}>
        Say Welcome
      </button>

      <br /><br />

      <button onClick={syntheticEvent}>
        OnPress
      </button>

      <br /><br />

      <CurrencyConvertor />

    </div>
  );
}

export default App;