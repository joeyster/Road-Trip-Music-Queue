import React, { Component } from "react";
import fs from "fs";

class LogIn extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    console.log("token: ", token);
    this.state = {
      logged_in: token ? true : false
    };
  }

  getHashParams = () => {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  };

  render() {
    if (this.state.logged_in) {
      return (
        <div className="col- 4 text-center">
          <br />
          <br />
          <h1>Your code:</h1>
          <p>{this.token}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <br />
          <br />
          <br />
          <div className="col- 4 text-center">
            <button className="btn btn-primary" onClick={this.authorization}>
              Pilot
            </button>
          </div>
          <br />
          <br />
          <br />
          <br />
          <div className="col- 4 text-center">
            <button className="btn btn-primary" onClick={this.authorization}>
              Passenger
            </button>
          </div>
        </div>
      );
    }
  }

  authorization = () => {
    console.log("clicked");
    document.location.href = "http://localhost:8888";
  };
}

export default LogIn;
