import React, { Component } from "react";
import Remote from "./Remote.js";

class RoomCode extends Component {
  state = {
    success_code: false
  };

  render() {
    if (this.state.success_code) {
      return <Remote access_token={this.state.access_token} />;
    } else {
      return (
        <div className="col- 4 text-center">
          <br />
          <br />
          <br />
          <br />
          <br />
          <h1>Room Code:</h1>
          <div className="row col- 4 text-center">
            <div className="col-2" />
            <div className="col-6 pr-0">
              <input
                id="code_form"
                className="form-control text-center"
                placeholder="code"
              />
            </div>
            <div className="col-3 pl-2">
              <button
                id="login_btn"
                className="btn btn-block btn-dark text-center"
                onClick={this.check_code}
              >
                Go!
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  check_code = () => {
    let code = document.getElementById("code_form").value;
    let url = new URL("http://localhost:8888/api");
    fetch(url, { method: "GET" })
      .then(response => {
        return response.json();
      })
      .then(json => {
        json = JSON.parse(json);
        let access_token = json[code];
        if (access_token) {
          this.setState({ success_code: true, access_token: access_token });
        } else {
          console.log("dne");
        }
      });
  };
}

export default RoomCode;
