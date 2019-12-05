import React, { Component } from "react";
import fetch from "node-fetch";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

// two types of spotify API calls for practice and knowledge

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.user_id = "";
    this.state = {
      room_code: this.props.room_code,
      search_array: []
    };
    spotifyApi.setAccessToken(this.state.access_token);
  }

  render() {
    //if empty array
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
            className="btn btn-block btn-dark shadow-none"
            onClick={this.send_song_array}
          >
            +
          </button>
        </div>
      </div>
    );
  }

  send_song_array = () => {
    let query = document.getElementById("search_bar").value;
    if (query !== "") {
      let url = "http://joeyliao.ddns.net:8888/search";
      let options = {
        method: "POST",
        mode: "cors", // no-cors, cors, *same-origin
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          room_code: this.state.room_code,
          search_query: query
        }) // body data type must match "Content-Type" header
      };
      fetch(url, options)
        .then(response => {
          return response.json();
        })
        .then(json => {
          this.props.get_song_array(json.song_array);
        })
        .catch(err => {
          console.log("Something went wrong!", err);
        });
    } else {
      console.log("empty search bar");
    }
  };

  deprecated_search = () => {
    // deprecated. keep for reference
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
            // let song_uri = json.tracks.items[0].uri;
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

  deprecated_queue_process = song_request => {
    // deprecated. keep for reference
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
    // deprecated. keep for reference
    console.log("queue_up");
    let url = new URL("http://joeyliao.ddns.net:8888/add_queue");
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
