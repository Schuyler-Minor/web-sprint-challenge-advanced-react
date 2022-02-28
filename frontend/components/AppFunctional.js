import React, { useState } from "react";
import axios from "axios";

export default function AppFunctional(props) {
  const URL = "http://localhost:9000/api/result";
  const [steps, setSteps] = useState(0);
  const [x, setX] = useState(2);
  const [y, setY] = useState(1);
  const [email, setEmail] = useState("");
  const [grid, setGrid] = useState("");
  const [message, setMessage] = useState("");

  const stepCounter = () => {
    setSteps(steps + 1);
  };
  const resetSteps = () => {
    setSteps(0);
    setMessage("");
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    axios
      .post(URL, { steps, y, x, email })
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setEmail("");
      });
  };

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Coordinates ({x}, {y})
        </h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square active">B</div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={stepCounter} id="left">
          LEFT
        </button>
        <button onClick={stepCounter} id="up">
          UP
        </button>
        <button onClick={stepCounter} id="right">
          RIGHT
        </button>
        <button onClick={stepCounter} id="down">
          DOWN
        </button>
        <button onClick={resetSteps} id="reset">
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          value={email}
          onChange={handleChange}
          id="email"
          type="email"
          placeholder="type email"
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
