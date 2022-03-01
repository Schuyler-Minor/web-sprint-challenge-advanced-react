import React, { useState } from "react";
import axios from "axios";

export default function AppFunctional(props) {
  const URL = "http://localhost:9000/api/result";
  const [steps, setSteps] = useState(0);
  const [x, setX] = useState(2);
  const [y, setY] = useState(2);
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const stepCounter = () => {
    setSteps(steps + 1);
  };
  const resetSteps = () => {
    setSteps(0);
    setMessage("");
    setX(2);
    setY(2);
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    axios
      .post(URL, { email, steps, y, x })
      .then((res) => {
        setMessage(res.data.message);
        setEmail("");
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
    // .finally(() => {
    //   setEmail("");
    // });
  };

  const yHandler = (incoming) => {
    if (x - incoming < 4 && x - incoming > 0) {
      setX(x - incoming);
      stepCounter();
    }
  };

  const xHandler = (incoming) => {
    if (y + incoming < 4 && y + incoming > 0) {
      setY(y + incoming);
      stepCounter();
    }
  };

  const gridComponent = () => {
    let outgoing = [];

    for (let horz = 1; horz < 4; horz++) {
      for (let vert = 1; vert < 4; vert++) {
        if (x === horz && y === vert) {
          outgoing.push(<div className="square active">B</div>);
        } else {
          outgoing.push(<div className="square"></div>);
        }
      }
    }

    return outgoing;
  };
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Coordinates ({x}, {y})
        </h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">{gridComponent()}</div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={() => xHandler(-1)} id="left">
          LEFT
        </button>
        <button onClick={() => yHandler(1)} id="up">
          UP
        </button>
        <button onClick={() => xHandler(1)} id="right">
          RIGHT
        </button>
        <button onClick={() => yHandler(-1)} id="down">
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
