import React, { Component } from "react";
import RoomCode from "./RoomCode.js";

class LogIn extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    this.state = {
      room_code: params.room_code,
      token: params.access_token,
      logged_in: token ? true : false,
      passenger: false
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
    if (this.state.passenger) {
      return <RoomCode />;
    }
    if (this.state.logged_in) {
      return (
        <div className="col- 4 text-center">
          <br />
          <br />
          <h1>Your code:</h1>
          <h5 className="text-danger">{this.state.room_code}</h5>
          <br />
          <br />
          <h5>
            Open up <strong>Spotify</strong>
            <br />
            <br />
            Start playing <strong>Queue</strong> playlist
          </h5>
        </div>
      );
    } else {
      return (
        <div>
          <br />
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
          <br />
          <div className="col- 4 text-center">
            <button className="btn btn-primary" onClick={this.middle_room}>
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
    this.setState({ passenger: true });
  };
}

export default LogIn;
