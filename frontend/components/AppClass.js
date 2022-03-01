import React from "react";
import axios from "axios";

const initialState = {
  x: 2,
  y: 2,
  steps: 0,
  email: "",
  message: "",
  error: "",
};

const URL = "http://localhost:9000/api/result";

export default class AppClass extends React.Component {
  state = initialState;

  emailChange = (event) => {
    const { value } = event.target;
    this.setState({ ...this.state, email: value });
  };

  postEmailChange = () => {
    axios
      .post(URL, {
        email: this.state.email,
        steps: this.state.steps,
        y: this.state.y,
        x: this.state.x,
      })
      .then((res) => {
        this.setState({
          ...this.state,
          message: res.data.message,
          error: "",
          email: "",
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          error: err.response.data.message,
          message: "",
        });
      });
  };

  emailSubmit = (event) => {
    event.preventDefault();
    this.postEmailChange();
  };

  stepCounter = () => {
    this.setState({
      ...this.state,
      steps: this.state.steps + 1,
    });
  };

  xHandlerLeft = () => {
    let x = this.state.x;
    if (x < 4 && x > 1) {
      this.setState({
        ...this.state,
        x: x - 1,
        steps: this.state.steps + 1,
      });
    }
  };

  xHandlerRight = () => {
    let x = this.state.x;
    if (x < 3 && x > 0) {
      this.setState({
        ...this.state,
        x: x + 1,
        steps: this.state.steps + 1,
      });
    }
  };

  yHandlerDown = () => {
    let y = this.state.y;
    if (y < 4 && y > 1) {
      this.setState({
        ...this.state,
        y: this.state.y - 1,
        steps: this.state.steps + 1,
      });
    }
  };

  yHandlerUp = () => {
    let y = this.state.y;
    if (y < 3 && y > 0) {
      this.setState({
        ...this.state,
        y: y + 1,
        steps: this.state.steps + 1,
      });
    }
  };

  resetStepCounter = () => {
    this.setState({
      ...this.state,
      steps: 0,
      message: "",
      x: 2,
      y: 2,
    });
  };

  render() {
    const { className } = this.props;

    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">
            Coordinates: ({this.state.x},{this.state.y})
          </h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
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
          <h3 id="message">
            {this.state.message}
            {this.state.error}
          </h3>
        </div>
        <div id="keypad">
          <button onClick={this.xHandlerLeft} id="left">
            LEFT
          </button>
          <button onClick={this.yHandlerUp} id="up">
            UP
          </button>
          <button onClick={this.xHandlerRight} id="right">
            RIGHT
          </button>
          <button onClick={this.yHandlerDown} id="down">
            DOWN
          </button>
          <button onClick={this.resetStepCounter} id="reset">
            reset
          </button>
        </div>
        <form onSubmit={this.emailSubmit}>
          <input
            onChange={this.emailChange}
            value={this.state.email}
            id="email"
            type="email"
            placeholder="type email"
          ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
