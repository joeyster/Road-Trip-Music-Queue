import React, { Component } from "react";

class Playlist extends Component {
  state = {
    id: this.props.id
  };
  render() {
    return (
      <div className="row m-1">
        <div className="col padding-0">
          <button className="btn btn-secondary btn-block text-left">
            Playlist
          </button>
        </div>
      </div>
    );
  }

  // print_key = () => {
  //   console.log("Song.js printing ", this.state.id);
  // };
}

export default Playlist;
