import React from "react";
import axios from "axios";

const initialState = {
  x: 1,
  y: 1,
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

  stepCounter = (event) => {
    console.log("something happened");
    const { value } = event.target;
    this.setState({ ...this.state, steps: value + 1 });
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
          <button onClick={this.stepCounter} id="left">
            LEFT
          </button>
          <button onClick={this.stepCounter} id="up">
            UP
          </button>
          <button onClick={this.stepCounter} id="right">
            RIGHT
          </button>
          <button onClick={this.stepCounter} id="down">
            DOWN
          </button>
          <button id="reset">reset</button>
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
