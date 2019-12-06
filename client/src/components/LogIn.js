import React, { Component } from "react";
import RoomCode from "./RoomCode.js";
import Timer from "./Timer.js";

class LogIn extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const room_code = params.room_code;
    // const token = params.access_token;
    this.state = {
      room_code: params.room_code,
      // token: params.access_token,
      logged_in: room_code ? true : false,
      passenger: false
    };
    // console.log("this.state.token: ", this.state.token);
    // spotifyApi.setAccessToken(this.state.token);
  }

  render() {
    if (this.state.passenger) {
      // Re-render happens after updating state with setState()
      return <RoomCode />;
    }
    if (this.state.logged_in) {
      // user has logged in
      return (
        <div className="col- 4 text-center">
          {this.create_playlist()}
          <br />
          <br />
          <h1>Your code:</h1>
          <h5 className="text-danger">{this.state.room_code}</h5>
          <br />
          <Timer room_code={this.state.room_code} />
          <br />
          <br />
          <h5>
            Open up <strong>Spotify</strong>
            <br />
            Have someone queue up a song
            <br />
            Start playing playlist "wavester.io"
          </h5>
          <br />
          <br />
          <div className="col- 4 text-center">
            <button className="btn btn-primary" onClick={this.clear_playlist}>
              Clear playlist
            </button>
          </div>
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
            <br />
            <br />
            Ugly design+colors... FOR NOW
          </div>
        </div>
      );
    }
  }

  clear_playlist = () => {
    let url = "http://wavester.io:8888/clear_playlist";
    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ room_code: this.state.room_code })
    };
    fetch(url, options);
  };

  create_playlist = () => {
    let url = "http://wavester.io:8888/create_playlist";
    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ room_code: this.state.room_code })
    };
    fetch(url, options);
  };

  authorization = () => {
    // takes pilot to authorization page to get access token and room code to give out
    document.location.href = "http://wavester.io:8888";
  };

  middle_room = () => {
    // takes passengers to page to enter passcode
    // Updation: because of updation in the lifecycle, changes to props or state will start an update
    this.setState({ passenger: true });
  };

  getHashParams = () => {
    // hash param = the params given through url - ex: #param1=foo
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
}

export default LogIn;
