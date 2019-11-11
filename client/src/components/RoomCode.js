import React, { Component } from "react";
import Remote from "./Remote.js";

class RoomCode extends Component {
  state = {
    successful_code: false,
    room_code: null
  };

  render() {
    if (this.state.successful_code) {
      // access granted. takes user to search/queue up songs
      return (
        <Remote
          access_token={this.state.access_token}
          room_code={this.state.room_code}
        />
      );
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

  //  make sure the code matches in JSON file
  check_code = () => {
    let room_code = document.getElementById("code_form").value;
    let url = new URL("http://localhost:8888/check_code");
    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: room_code })
    };
    fetch(url, options)
      .then(response => {
        console.log(response);
        console.log(typeof response);
        return response.json();
      })
      .then(json => {
        console.log("json[message]: ", json["message"]);
        if (json["message"] === "exists") {
          this.setState({
            successful_code: true,
            room_code: room_code
          });
        } else {
          console.log("dne");
        }
        // console.log(json);
        // let access_token = json[code]["token"];
        // if (access_token) {
        //   this.setState({
        //     successful_code: true,
        //     access_token: access_token,
        //     code: code
        //   });
        // } else {
        //   console.log("dne");
        // }
      });
  };
}

export default RoomCode;
