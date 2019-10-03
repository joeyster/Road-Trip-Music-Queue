import React, { Component } from "react";
import fetch from "node-fetch";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

//two uses of spotify API called for practice and knowledge

class SearchBar extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.access_token);
    this.state = {
      access_token: this.props.access_token,
      queue: ["joey", "liao"]
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

      fetch(FETCH_URL, myOptions)
        .then(response => response.json())
        .then(json => {
          console.log("json: ", json);
          if (json.tracks.items[0] !== undefined) {
            console.log(`play(${json.tracks.items[0].uri})`);
            this.play(json.tracks.items[0].uri);
          } else {
            console.log("track undefined");
          }
        });
    }
  };

  play_test = song_request => {};

  queue_up = song_request => {
    console.log("queue_up");
    // console.log("song_request: ", song_request);
    // console.log("typeof song_request: ", typeof song_request);
    // this.setState({
    //   access_token: this.props.access_token,
    //   queue: this.state.queue.push("hello")
    // });
    // console.dir("state queue: ", this.state.queue);
    let url = new URL("http://localhost:8888/add_queue");
    let data = { answer: "42" };
    fetch(url, {
      method: "POST",
      mode: "cors", // no-cors, cors, *same-origin
      headers: {
        "Content-Type": "application/json"
        // "Content-Type": "application/x-www-form-urlencoded"
        // "Access-Control-Allow-Origin": "http://localhost:8888/add_queue"
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(response => {});
  };

  play = song_request => {
    console.log(`song_request: {song_request}`);
    spotifyApi.play({
      // uris: [song_request]
      uris: [
        "spotify:track:0TK2YIli7K1leLovkQiNik",
        "spotify:track:1ea97AUSazu2QZw9BnHJqK"
      ]
    });
  };

  check_code = () => {
    let code = document.getElementById("code_form").value;
    let url = new URL("http://localhost:8888/api");
    fetch(url, { method: "GET" })
      .then(response => {
        return response.json();
      })
      .then(json => {
        json = JSON.parse(json);
        let access_token = json[code];
        if (access_token) {
          this.setState({ success_code: true, access_token: access_token });
        } else {
          console.log("dne");
        }
      });
  };
}

//1ea97AUSazu2QZw9BnHJqK -- gucci gucci
//0TK2YIli7K1leLovkQiNik --senorita
export default SearchBar;
