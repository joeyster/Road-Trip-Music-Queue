import React, { Component } from "react";

class Song extends Component {
  state = {
    id: this.props.id
  };
  render() {
    return (
      <div className="row m-1">
        <div className="col-10 padding-0">
          <button className="btn btn-secondary btn-block text-left">
            Song
          </button>
        </div>
        <div className="col-2 padding-0">
          <button className="btn btn-primary btn-block text-center btn-dark">
            +
          </button>
        </div>
        {/* {this.print_key()} */}
      </div>
    );
  }

  // print_key = () => {
  //   console.log("Song.js printing ", this.state.id);
  // };
}

export default Song;
