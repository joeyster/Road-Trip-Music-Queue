import React, { Component } from "react";
import querystring from "querystring";

let client_id = "19427a009053421cad910c10b315a050"; // Your client id
let client_secret = "9dabb10eca184b89bce885069db5f4e2"; // Your secret
let redirect_uri = "http://localhost:8888/callback"; // Your redirect uri

class LogIn extends Component {
  state = {};
  render() {
    return (
      <div className="col- 4 text-center">
        <button className="btn btn-primary" onClick={this.authorization}>
          Log In
        </button>
      </div>
    );
  }

  generateRandomString = length => {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  authorization = () => {
    let state = this.generateRandomString(16);
    let scope = "user-read-private user-read-email";
    const BASE_URL =
      "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      });
    console.log(BASE_URL);

    fetch(BASE_URL)
      .then(response => {
        console.log(response);
      })
      .then(json => {
        console.log(json);
      });
  };
}

export default LogIn;
