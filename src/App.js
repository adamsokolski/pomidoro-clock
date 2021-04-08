import "./App.css";

import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 25,
      sessionTime: 1500,
      breakLength: 5,
      breakTime: 300,
    };
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
  }

  sessionIncrement() {
    this.setState((state) => ({
      sessionLength: state.sessionLength + 1,
      sessionTime: state.sessionTime + 60,
    }));
  }

  sessionDecrement() {
    this.setState((state) => ({
      sessionLength: state.sessionLength - 1,
      sessionTime: state.sessionTime - 60,
    }));
  }

  breakIncrement() {
    this.setState((state) => ({
      breakLength: state.breakLength + 1,
      breakTime: state.breakTime + 60,
    }));
  }

  breakDecrement() {
    this.setState((state) => ({
      breakLength: state.breakLength - 1,
      breakTime: state.breakTime - 60,
    }));
  }

  render() {
    const { sessionLength, breakLength } = this.state;
    return (
      <div className="App">
        <div id="time-left">25:00</div>
        <button id="start_stop">Start</button>
        <button id="reset">Reset</button>

        <div id="timer-label">Timer</div>
        <div id="session-length">{sessionLength}</div>
        <div id="break-length">{breakLength}</div>

        <div id="session-label">Session Length</div>
        <button id="session-increment" onClick={this.sessionIncrement}>
          +
        </button>
        <button id="session-decrement" onClick={this.sessionDecrement}>
          -
        </button>

        <div id="break-label">Break Length</div>
        <button id="break-increment" onClick={this.breakIncrement}>
          +
        </button>
        <button id="break-decrement" onClick={this.breakDecrement}>
          -
        </button>
      </div>
    );
  }
}
