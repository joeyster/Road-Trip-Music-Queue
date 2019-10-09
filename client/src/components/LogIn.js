import React, { Component } from "react";
import RoomCode from "./RoomCode.js";
import Timer from "./Timer.js";

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
      // Re-render happens after updating state with setState()
      return <RoomCode />;
    }
    if (this.state.logged_in) {
      // user has logged in
      return (
        <div className="col- 4 text-center">
          <br />
          <br />
          <h1>Your code:</h1>
          <h5 className="text-danger">{this.state.room_code}</h5>
          <br />
          <Timer />
          <br />
          <br />
          <h5>
            Open up <strong>Spotify</strong>
            <br />
            <br />
            Start playing
          </h5>
        </div>
      );
    } else {
      // user has not logged in yet. AKA first initial view
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

  // takes pilot to authorization page to get access token and room code to give out
  authorization = () => {
    document.location.href = "http://localhost:8888";
  };

  // takes passengers to page to enter passcode
  // Updation: because of updation in the lifecycle, changes to props or state will start an update
  middle_room = () => {
    this.setState({ passenger: true });
  };
}

export default LogIn;
