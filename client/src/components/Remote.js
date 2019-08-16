import React, { Component } from "react";

class Remote extends Component {
  state = {};
  render() {
    console.log(this.props.access_token);
    return <h1>{this.props.access_token}</h1>;
  }
}

export default Remote;
