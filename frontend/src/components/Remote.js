import React, { Component } from "react";
import SearchBar from "./SearchBar.js";
import Song from "./Song.js";

class Remote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room_code: this.props.room_code,
      song_array: []
    };
  }

  render() {
    if (this.state.song_array.length === 0) {
      return (
        <div>
          <SearchBar
            room_code={this.state.room_code}
            get_song_array={this.set_array}
          />
          <br />
          <div id="songs"></div>
        </div>
      );
    } else {
      return (
        <div>
          <SearchBar
            room_code={this.state.room_code}
            get_song_array={this.set_array}
          />
          <br />
          {this.state.song_array.map(song => (
            <div key={song.id}>
              <Song
                room_code={this.state.room_code}
                uri={song.uri}
                name={song.name}
                artist={song.artists[0].name}
              />
            </div>
          ))}
        </div>
      );
    }
  }

  set_array = child_data => {
    this.setState({ song_array: child_data });
  };
}

export default Remote;
