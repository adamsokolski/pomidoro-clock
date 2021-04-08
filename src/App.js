import "./App.css";

import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 25,
      sessionTime: 5,
      breakLength: 5,
      breakTime: 5,
      timeLeft: "25:00",
      isRunning: false,
      intervalId: "",
      label: "Session",
    };
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.secondsToTime = this.secondsToTime.bind(this);
    this.counting = this.counting.bind(this);
  }

  sessionIncrement() {
    if (this.state.sessionLength > 0 && this.state.sessionLength < 60) {
      this.setState((state) => ({
        sessionLength: state.sessionLength + 1,
        sessionTime: state.sessionTime + 60,
        timeLeft: `${this.secondsToTime(state.sessionTime + 60)}`,
      }));
    }
  }

  sessionDecrement() {
    if (this.state.sessionLength > 1 && this.state.sessionLength < 61) {
      this.setState((state) => ({
        sessionLength: state.sessionLength - 1,
        sessionTime: state.sessionTime - 60,
        timeLeft: `${this.secondsToTime(state.sessionTime - 60)}`,
      }));
    }
  }

  breakIncrement() {
    if (this.state.breakLength > 0 && this.state.breakLength < 60) {
      this.setState((state) => ({
        breakLength: state.breakLength + 1,
        breakTime: state.breakTime + 60,
      }));
    }
  }

  breakDecrement() {
    if (this.state.breakLength > 1 && this.state.breakLength < 61) {
      this.setState((state) => ({
        breakLength: state.breakLength - 1,
        breakTime: state.breakTime - 60,
      }));
    }
  }

  handleStart() {
    if (this.state.isRunning) {
      clearInterval(this.state.intervalId);
      this.setState(() => ({
        isRunning: false,
      }));
    } else {
      let intervalId = setInterval(this.counting, 1000);
      this.setState({
        intervalId: intervalId,
        isRunning: true,
      });
    }
  }

  counting() {
    // Todo: check label and if current timer reaches 0 switch to another

    if (this.state.sessionTime !== -1) {
      this.setState((state) => ({
        sessionTime: state.sessionTime - 1,
        timeLeft: this.secondsToTime(this.state.sessionTime),
        label: "Session",
      }));
    } else {
      this.setState((state) => ({
        breakTime: state.breakTime - 1,
        timeLeft: this.secondsToTime(this.state.breakTime),
        label: "Break",
      }));
    }
  }

  secondsToTime(e) {
    let m = Math.floor((e % 3600) / 60)
      .toString()
      .padStart(2, "0");
    let s = Math.floor(e % 60)
      .toString()
      .padStart(2, "0");

    return m + ":" + s;
  }

  render() {
    const { sessionLength, breakLength, timeLeft, label } = this.state;
    return (
      <div className="App">
        <div id="time-left">{timeLeft}</div>
        <button id="start_stop" onClick={this.handleStart}>
          Start
        </button>
        <button id="reset">Reset</button>

        <div id="timer-label">{label}</div>
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
