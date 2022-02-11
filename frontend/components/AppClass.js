import React from "react";
import axios from "axios";

const initialState = {
  positionX: 1,
  positionY: 2,
  steps: 3,
  email: "lady@gaga.com",
};

const URL = "http://localhost:9000/api/result";

export default class AppClass extends React.Component {
  state = initialState;

  onSubmit = (event) => {
    event.preventDefault();
    const payLoadToSend = {
      email: this.state.email,
      steps: this.state.steps,
      x: this.state.positionX,
      y: this.state.positionY,
    };
    axios
      .post(URL, payLoadToSend)
      .then((res) => {
        console.log(res.data.message);
        this.setState({ ...this.state, message: res.data.message });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onChange = (event) => {
    const { value, id } = event.target;
    this.setState({ ...this.state, [id]: value });
  };

  render() {
    console.log("THE STATE ---> ", this.state);

    const { className } = this.props;
    console.log("PROPS", this.props);

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
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left">LEFT</button>
          <button id="up">UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onChange}
            value={this.state.email.data}
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
