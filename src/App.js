import React, { Component } from "react";
import "./App.scss";
import bell from "./sounds/bell.mp3";
import ProgressRing from "./ProgressRing";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 25,
      sessionTime: 1500,
      breakLength: 5,
      breakTime: 300,
      timeLeft: "25:00",
      isRunning: false,
      intervalId: "",
      label: "Session",
      progress: 100,
    };
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.secondsToTime = this.secondsToTime.bind(this);
    this.counting = this.counting.bind(this);
    this.preset = this.preset.bind(this);
  }

  componentDidUpdate() {
    document.title = `${this.state.timeLeft} - ${this.state.label}`;
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
  preset() {
    this.setState((state) => ({
      // sessionLength: 25,
      // sessionTime: 1500,
      // breakLength: 5,
      // breakTime: 300,
      // timeLeft: "25:00",
      // isRunning: false,
      // intervalId: "",
      // label: "Session",
      // progress: 100,
      sessionLength: 60,
      sessionTime: 3600,
      timeLeft: `${this.secondsToTime(3600)}`,
      breakTime: 600,
      breakLength: 10,
    }));
  }

  handleStart() {
    if (this.state.isRunning) {
      clearInterval(this.state.intervalId);
      this.setState(() => ({
        isRunning: false,
      }));
    } else {
      this.counting();
      let intervalId = setInterval(this.counting, 1000);
      this.setState({
        intervalId: intervalId,
        isRunning: true,
      });
    }
  }

  handleReset(e) {
    clearInterval(this.state.intervalId);
    this.setState({
      sessionLength: 25,
      sessionTime: 1500,
      breakLength: 5,
      breakTime: 300,
      timeLeft: "25:00",
      isRunning: false,
      label: "Session",
      progress: 100,
    });
    let audio = e.target.nextElementSibling;
    audio.currentTime = 0;
    audio.pause();
  }

  counting() {
    if (this.state.label === "Session") {
      this.setState((state) => ({
        sessionTime: state.sessionTime - 1,
        timeLeft: this.secondsToTime(this.state.sessionTime),
        label: "Session",
        progress: (
          ((state.sessionTime - 1) / (state.sessionLength * 60)) *
          100
        ).toFixed(2),
      }));
    } else if (this.state.label === "Break") {
      this.setState((state) => ({
        breakTime: state.breakTime - 1,
        timeLeft: this.secondsToTime(this.state.breakTime),
        label: "Break",
        progress: (
          ((state.breakTime - 1) / (state.breakLength * 60)) *
          100
        ).toFixed(2),
      }));
    }

    // End of session or break
    if (this.state.sessionTime === -1) {
      let audio = document.querySelector("#beep");
      audio.play();
      this.setState((state) => ({
        sessionTime: state.sessionLength * 60,
        label: "Break",
      }));
    } else if (this.state.breakTime === -1) {
      let audio = document.querySelector("#beep");
      audio.play();
      this.setState((state) => ({
        breakTime: state.breakLength * 60,
        label: "Session",
      }));
    }
  }

  secondsToTime(e) {
    let m = Math.floor(e / 60)
      .toString()
      .padStart(2, "0");
    let s = Math.floor(e % 60)
      .toString()
      .padStart(2, "0");

    return m + ":" + s;
  }

  render() {
    const { sessionLength, breakLength, timeLeft, label, progress, isRunning } =
      this.state;
    return (
      <div className="App">
        <header>
          <h2>
            🍅⏰ <br /> Pomidoro Clock
          </h2>
        </header>
        <div className="timer">
          <ProgressRing radius={120} stroke={5} progress={progress} />
          <div id="timer-label">{label}</div>
          <div id="time-left">{timeLeft}</div>
        </div>

        <div class="controls-box">
          <div>
            <button id="start_stop" onClick={this.handleStart}>
              {isRunning ? "Stop" : "Start"}
            </button>
            <button id="reset" onClick={this.handleReset}>
              Reset
            </button>
            <audio src={bell} id="beep">
              Your browser does not support the
              <code>audio</code> element.
            </audio>
          </div>

          <div id="session-label">Session Length</div>

          <button
            disabled={isRunning}
            id="session-increment"
            className="circleButton"
            onClick={this.sessionIncrement}
          >
            +
          </button>
          <div id="session-length">{sessionLength}</div>

          <button
            disabled={isRunning}
            id="session-decrement"
            className="circleButton"
            onClick={this.sessionDecrement}
          >
            -
          </button>

          <div id="break-label">Break Length</div>
          <button
            disabled={isRunning}
            id="break-increment"
            className="circleButton"
            onClick={this.breakIncrement}
          >
            +
          </button>
          <div id="break-length">{breakLength}</div>

          <button
            disabled={isRunning}
            id="break-decrement"
            className="circleButton"
            onClick={this.breakDecrement}
          >
            -
          </button>
          <div id="preset-label">Preset</div>
          <button disabled={isRunning} id="preset-60-10" onClick={this.preset}>
            60-10
          </button>
        </div>
        <a
          className="App-link"
          href="https://github.com/idKrazu/pomidoro-clock"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    );
  }
}
