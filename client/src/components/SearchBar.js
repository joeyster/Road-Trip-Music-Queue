import React, { Component } from "react";
import fetch from "node-fetch";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

// two uses of spotify API called for practice and knowledge

class SearchBar extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.access_token);
    this.user_id = "";
    this.state = {
      access_token: this.props.access_token,
      queue: ["song1", "song2"]
    };
    spotifyApi.setAccessToken(this.state.access_token);
  }
  render() {
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
  }

  search = () => {
    let query = document.getElementById("search_bar").value;
    // check for non-empty field
    if (query !== "") {
      // searching for song
      let BASE_URL = "https://api.spotify.com/v1/search?";
      let FETCH_URL = BASE_URL + "q=" + query + "&type=track&limit=1";
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
            this.queue_process(song_uri); // start queuing process
          } else {
            console.log("track undefined");
          }
        });
    }
  };

  queue_process = song_request => {
    console.log("song_request: ", song_request);
    spotifyApi.getMe().then(response => {
      this.user_id = response["id"];
      let playlist_id = "";
      spotifyApi.getUserPlaylists(this.user_id).then(response => {
        //if playlist exists
        if (response["items"][0]["name"] === "wavester.io") {
          playlist_id = response["items"][0]["id"];
          spotifyApi.addTracksToPlaylist(playlist_id, [song_request]); // add to playlist
        } else {
          //if playlist doesnt exist, create playlist and add
          let options = { name: "wavester.io" };
          spotifyApi.createPlaylist(this.user_id, options, callback => {
            console.log("playlist made");
            spotifyApi.getUserPlaylists(this.user_id).then(response => {
              console.log("playlist_id: ");
              playlist_id = response["items"][0]["id"];
              spotifyApi.addTracksToPlaylist(playlist_id, [song_request]); // add to playlist
            });
          });
        }
      });
    });
  };

  add_to_playlist = (playlist_id, song_request) => {
    spotifyApi.addTracksToPlaylist(playlist_id, [song_request]);
  };

  // below, queue_up(), is really good for learning
  // POST api call
  queue_up = song_request => {
    console.log("queue_up");
    let url = new URL("http://localhost:8888/add_queue");
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
