//https://stackoverflow.com/questions/39426083/update-react-component-every-second

import React, { Component } from "react";

class Timer extends Component {
  state = {
    time: 3600 //token expires in 1 hour
  };

  tick() {
    if (this.state.time > 0) {
      this.setState({ time: this.state.time - 1 });
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    if (this.state.time === 0) {
      return <h3>Code expired. Please get a new code.</h3>;
    } else {
      return (
        <h3>
          {Math.floor(this.state.time / 60)} min {this.state.time % 60} sec
        </h3>
      );
    }
  }
}

export default Timer;
