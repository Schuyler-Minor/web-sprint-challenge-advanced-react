import React from "react";
import axios from "axios";

const initialState = {
  x: 2,
  y: 2,
  steps: 3,
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

  resetEmailChange;
  postEmailChange = () => {
    axios
      .post(URL, {
        email: this.state.email,
        steps: this.state.steps,
        y: this.state.y,
        x: this.state.x,
      })
      .then((res) => {
        this.setState({ ...this.state, message: res.data.message });
        this.setState({ ...this.state, email: "" });
      })
      .catch((err) => {
        this.setState({ ...this.state, error: err.response.data.message });
        this.setState({ ...this.state, message: "" });
      });
  };

  emailSubmit = (event) => {
    event.preventDefault();
    this.postEmailChange();
  };

  render() {
    const { className } = this.props;

    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates (2, 2)</h3>
          <h3 id="steps">You moved 0 times</h3>
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
          <button id="left">LEFT</button>
          <button id="up">UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
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
