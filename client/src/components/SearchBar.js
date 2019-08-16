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
            <img src="./search_icon.png" alt="search" width="18" length="18" />
          </button>
        </div>
        <br />
        <br />
        <br />
        <div>
          <button
            id="play_btn"
            className="btn btn-block btn-dark"
            onClick={this.play}
          >
            Play
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
          console.log(json.tracks.items[0].id);
        });
    }
  };

  play = () => {
    // let query = document.getElementById("search_bar").value;
    // let BASE_URL = "https://api.spotify.com/v1/me/player/play?";
    // let FETCH_URL =
    //   BASE_URL + "context_uri=spotify=album=5ht7ItJgpBH7W6vJ5BqpPr";

    // var myOptions = {
    //   method: "PUT",
    //   headers: {
    //     // context_uri: "spotify:album:1Je1IMUlBXcx1Fz0WE7oPT",
    //     Authorization: "Bearer " + this.state.access_token
    //   },
    //   mode: "cors",
    //   cache: "default"
    // };

    // fetch(FETCH_URL, myOptions);

    spotifyApi.play({
      context_uri: "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
      offset: {
        position: 5
      },
      position_ms: 0
    });
  };
}

export default SearchBar;
