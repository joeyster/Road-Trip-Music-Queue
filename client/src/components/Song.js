import React, { Component } from "react";

class Song extends Component {
  state = {
    room_code: this.props.room_code,
    uri: this.props.uri,
    name: this.props.name,
    artist: this.props.artist
  };

  render() {
    return (
      <div className="row m-2">
        <div className="col-10 pr-0">
          <button className="btn btn-secondary btn-block text-left" disabled>
            {this.state.name} by {this.state.artist}
          </button>
        </div>
        <div className="col-2 pl-2">
          <button
            className="btn btn-block text-center btn-dark shadow-none"
            onClick={this.add_song}
          >
            +
          </button>
        </div>
      </div>
    );
  }

  add_song = () => {
    let url = "http://192.168.1.114:8888/add_song";
    let options = {
      method: "POST",
      mode: "cors", // no-cors, cors, *same-origin
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        room_code: this.state.room_code,
        uri: this.state.uri
      }) // body data type must match "Content-Type" header
    };
    fetch(url, options);
  };
}

export default Song;
