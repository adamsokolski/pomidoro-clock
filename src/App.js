import "./App.css";

import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 25,
      breakLength: 5,
    };
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
        <button id="session-decrement">-</button>
        <button id="session-increment">+</button>

        <div id="break-label">Break Length</div>
        <button id="break-decrement">-</button>
        <button id="break-increment">+</button>
      </div>
    );
  }
}
