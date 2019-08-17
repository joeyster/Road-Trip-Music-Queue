import React, { Component } from "react";
import fetch from "node-fetch";

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class SearchBar extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.access_token);
    this.state = { access_token: this.props.access_token };
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
            id="login_btn"
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

      fetch(FETCH_URL, myOptions)
        .then(response => response.json())
        .then(json => {
          console.log(json);
          if (json.tracks.items[0] !== undefined) {
            this.play(json.tracks.items[0].id);
          }
        });
    }
  };

  play = song_request => {
    spotifyApi.play({
      // uris: ["spotify:track:" + song_request]
      uris: [
        "spotify:track:0TK2YIli7K1leLovkQiNik",
        "spotify:track:1ea97AUSazu2QZw9BnHJqK"
      ]
    });
  };
}

//1ea97AUSazu2QZw9BnHJqK -- gucci gucci
//0TK2YIli7K1leLovkQiNik --senorita
export default SearchBar;
