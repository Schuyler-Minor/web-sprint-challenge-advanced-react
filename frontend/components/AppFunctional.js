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

  const xHandlerLeft = () => {
    if (x < 4 && x > 1) {
      setX(x - 1);
      stepCounter();
    }
  };

  const xHandlerRight = () => {
    if (x < 3 && x > 0) {
      setX(x + 1);
      stepCounter();
    }
  };

  const yHandlerUp = () => {
    if (y < 4 && y > 1) {
      setY(y - 1);
      stepCounter();
    }
  };

  const yHandlerDown = () => {
    if (y < 3 && y > 0) {
      setY(y + 1);
      stepCounter();
    }
  };

  const gridComponent = () => {
    let outgoing = [];

    for (let vert = 1; vert < 4; vert++) {
      for (let horz = 1; horz < 4; horz++) {
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
        <button onClick={xHandlerLeft} id="left">
          LEFT
        </button>
        <button onClick={yHandlerUp} id="up">
          UP
        </button>
        <button onClick={xHandlerRight} id="right">
          RIGHT
        </button>
        <button onClick={yHandlerDown} id="down">
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
