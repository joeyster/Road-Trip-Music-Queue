//https://stackoverflow.com/questions/39426083/update-react-component-every-second

import React, { Component } from "react";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 3600, //token expires in 1 hour
      room_code: this.props.room_code
    };
    this.get_time_left();
  }

  tick() {
    if (this.state.time > 0) {
      this.setState({ time: this.state.time - 1 });
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
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

  get_time_left = () => {
    let url = new URL("http://192.168.1.114:8888/time_left");
    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: this.state.room_code })
    };
    fetch(url, options)
      .then(response => {
        return response.json();
      })
      .then(json => {
        let expire_time = json["message"];
        let diff = expire_time - Date.now();
        this.setState({ time: Math.floor(diff / 1000) });
      })
      .catch(err => {
        console.log("Something went wrong!", err);
      });
  };
}

export default Timer;
