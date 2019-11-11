import React, { Component } from "react";
import SearchBar from "./SearchBar.js";

class Remote extends Component {
  // console.log(this.props.access_token);
  constructor(props) {
    super(props);
    this.state = {
      room_code: this.props.room_code,
      song_array: []
    };
  }
  render() {
    return (
      <div>
        <SearchBar
          room_code={this.state.room_code}
          get_song_array={this.display_array}
        />
        <br />
        <div id="songs"></div>
        <br />
        room_code: {this.state.room_code}
        <br />
        {/* song_array: {this.state.song_array} */}
      </div>
    );
  }
  display_array = child_data => {
    console.log("callback function");
    this.setState({ song_array: child_data });
    console.log(this.state.song_array);
  };
}

export default Remote;
