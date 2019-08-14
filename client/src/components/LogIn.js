import React, { Component } from "react";
import querystring from "querystring";

let client_id = "19427a009053421cad910c10b315a050"; // Your client id
let client_secret = "9dabb10eca184b89bce885069db5f4e2"; // Your secret
let redirect_uri = "http://192.168.1.100:8888/callback"; // Your redirect uri

class LogIn extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    this.state = {
      logged_in: token ? true : false
    };
  }

  getHashParams() {
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
  }

  render() {
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
          {/* {this.state.logged_in && (
            <button onClick={() => this.getNowPlaying()}>
              Check Now Playing
            </button>
          )} */}
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

  authorization = () => {
    console.log("clicked");
    document.location.href = "http://192.168.1.100:8888";
  };
}
// test branch
export default LogIn;
