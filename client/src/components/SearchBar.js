import React, { Component } from "react";
import fetch from "node-fetch";

// let client_id = "19427a009053421cad910c10b315a050"; // Your client id
// let client_secret = "9dabb10eca184b89bce885069db5f4e2"; // Your secret
// let redirect_uri = "http://localhost:8888/callback"; // Your redirect uri
let accessToken =
  "BQA57_XfmH7YPCd0F4p6Olw9oJbxi7glSDF9wZErHDBOWywVm4VM8z-v7ft6H54jumiuKRWq4GFXMC3Ay4XM_ZRcN7vyQv2H1nI-fYGXoofue_EFVXmeZI0jFvCqPRKI4MAjRO6F5qynF1fib844Pr3hmeXZ6v2rCIQsacrbUOVaLEgz5KUDqvakgBESzRNrwA";

class SearchBar extends Component {
  state = {};
  render() {
    return (
      <div className="row m-2">
        <div className="col-10 pr-0">
          <input className="form-control" placeholder="Search songs" />
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
      </div>
    );
  }

  search = () => {
    console.log("hey");
    // const BASE_URL = "https://api.spotify.com/v1/me/player/pause";

    // var myOptions = {
    //   method: "PUT",
    //   headers: {
    //     Authorization: "Bearer " + accessToken
    //   }
    //   // mode: "cors",
    //   // cache: "default"
    // };

    // fetch(BASE_URL, myOptions);
  };
}

export default SearchBar;
