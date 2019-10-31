import React, { Component } from "react";
import fetch from "node-fetch";
import SpotifyWebApi from "spotify-web-api-js";
import Song from "./Song.js";
const spotifyApi = new SpotifyWebApi();

// two uses of spotify API called for practice and knowledge

class SearchBar extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.access_token);
    this.user_id = "";
    this.state = {
      access_token: this.props.access_token,
      search_array: []
    };
    spotifyApi.setAccessToken(this.state.access_token);
  }
  render() {
    //if empty array
    // console.log(this.state.search_array);
    if (this.state.search_array.length === 0) {
      return (
        <div className="row m-2">
          <div className="col-10 pr-0">
            <input
              id="search_bar"
              className="form-control"
              placeholder="Search songs"
            />
          </div>
          <div className="col-2 pl-2">
            <button
              id="search_btn"
              className="btn btn-block btn-dark"
              onClick={this.search}
            >
              +
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row m-2">
          <div className="col-10 pr-0">
            <input
              id="search_bar"
              className="form-control"
              placeholder="Search songs"
            />
          </div>
          <div className="col-2 pl-2">
            <button
              id="search_btn"
              className="btn btn-block btn-dark"
              onClick={this.search}
            >
              +
            </button>
          </div>
          <Song
            uri={this.state.search_array[0].uri}
            name={this.state.search_array[0].name}
            artist={this.state.search_array[0].artists[0].name}
          />
          <Song
            uri={this.state.search_array[1].uri}
            name={this.state.search_array[1].name}
            artist={this.state.search_array[1].artists[0].name}
          />
          <Song
            uri={this.state.search_array[2].uri}
            name={this.state.search_array[2].name}
            artist={this.state.search_array[2].artists[0].name}
          />
          <Song
            uri={this.state.search_array[3].uri}
            name={this.state.search_array[3].name}
            artist={this.state.search_array[3].artists[0].name}
          />
          <Song
            uri={this.state.search_array[4].uri}
            name={this.state.search_array[4].name}
            artist={this.state.search_array[4].artists[0].name}
          />
        </div>
      );
    }
  }

  search = () => {
    let query = document.getElementById("search_bar").value;
    // check for non-empty field
    if (query !== "") {
      // searching for song
      let BASE_URL = "https://api.spotify.com/v1/search?";
      let FETCH_URL = BASE_URL + "q=" + query + "&type=track&limit=5";
      var myOptions = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.state.access_token
        },
        mode: "cors",
        cache: "default"
      };

      // attempt to queue up song with restful API call
      fetch(FETCH_URL, myOptions)
        .then(response => response.json())
        .then(json => {
          // found
          if (json.tracks.items[0] !== undefined) {
            let song_uri = json.tracks.items[0].uri;
            console.log(json);
            this.setState({ search_array: json.tracks.items });
            console.log("this.state.search_array: ", this.state.search_array);

            // this.queue_process(song_uri); // start queuing process
          } else {
            console.log("track undefined");
          }
        });
    }
  };

  queue_process = song_request => {
    spotifyApi.getMe().then(response => {
      this.user_id = response["id"];
      let playlist_id = "";
      spotifyApi.getUserPlaylists(this.user_id).then(response => {
        let playlist_index = this.index_getter(response["items"]);
        playlist_id = response["items"][playlist_index]["id"];
        spotifyApi.addTracksToPlaylist(playlist_id, [song_request]); // add to playlist
      });
    });
  };

  index_getter = items => {
    // gets the index of playlist with name as "wavester.io"
    // POSSIBLE PROBLEM: if playlist list too long, js might move on without a proper index
    let index = 0;
    let num;
    for (num in items) {
      if (items[num]["name"] === "wavester.io") {
        return index;
      }
      index += 1;
    }
    return -1; // DNE
  };

  // below, queue_up(), is really good for learning
  // POST api call
  queue_up = song_request => {
    console.log("queue_up");
    let url = new URL("http://192.168.1.114:8888/add_queue");
    let data = { answer: "42" };
    fetch(url, {
      method: "POST",
      mode: "cors", // no-cors, cors, *same-origin
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(response => {});
  };
}
export default SearchBar;
