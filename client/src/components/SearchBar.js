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
    if (query !== "") {
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

      // queue up into .json song is if found
      fetch(FETCH_URL, myOptions)
        .then(response => response.json())
        .then(json => {
          if (json.tracks.items[0] !== undefined) {
            console.log(`queuing up ${json.tracks.items[0].uri}`);
            // this.queue_up(json.tracks.items[0].uri);
            this.queue_process();
            // this.add_to_playlist();
          } else {
            console.log("track undefined");
          }
        });
    }
  };

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

  // only for testing purposes. show how to use .play()
  play = song_request => {
    spotifyApi.play({
      // uris: [song_request]
      uris: [
        "spotify:track:0TK2YIli7K1leLovkQiNik",
        "spotify:track:1ea97AUSazu2QZw9BnHJqK"
      ]
    });
  };

  queue_process = () => {
    spotifyApi.getMe().then(response => {
      this.user_id = response["id"];
      let options = { name: "wavester.io" };
      console.log("user_id: ", this.user_id);
      spotifyApi.createPlaylist(this.user_id, options, callback => {
        this.add_to_playlist(this.user_id);
      });
    });
  };

  add_to_playlist = () => {
    spotifyApi.getUserPlaylists(this.user_id).then(response => {
      console.log("response: ", response);
      console.log("items: ", response["items"]);
      console.log("items[0]: ", response["items"][0]);
    });
  };
}

//1ea97AUSazu2QZw9BnHJqK -- gucci gucci
//0TK2YIli7K1leLovkQiNik --senorita
export default SearchBar;
