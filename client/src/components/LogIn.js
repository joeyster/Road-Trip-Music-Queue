import React, { Component } from "react";
import axios from "axios";
// import fetch from "node-fetch";
import Song from "./Song.js";

class LogIn extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    this.state = {
      room_code: params.room_code,
      token: params.access_token,
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

  get_data = () => {
    let url = new URL("http://localhost:8888/api");
    console.log(url);
    fetch(url, { method: "GET" })
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log("fetched json: ", json);
      });
  };

  render() {
    if (this.state.logged_in) {
      this.get_data();
      return (
        <div className="col- 4 text-center">
          <br />
          <br />
          <h1>Your code:</h1>
          <h5>{this.state.room_code}</h5>
        </div>
      );
    } else {
      return (
        <div>
          <Song />
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

  //takes pilot to authorization page to get access token and room code to give out
  authorization = () => {
    document.location.href = "http://localhost:8888";
  };

  //takes passengers to page to enter passcode
  middle_room = () => {
    this.setState();
  };
}

export default LogIn;
