import React, { Component } from "react";
import fetch from "node-fetch";

let accessToken =
  "BQC1qZs27yruwa20hYt_iBXEQbkeMNpgC0pA4yEkDf3A7o0Kk19aQ8Wb6s7uVXOgs4sbshFycs2aU-pcjjmUqXf-n4VCA95D4RQRKRLXYpO9vDGe_GqIxUMn5_jISLKNvNvqRQ7bQS1nnQHTNZLOt7kvxY70D_GexY1SBazkeJLFrdaXGjdD0Q3LyA";

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
    const BASE_URL = "https://api.spotify.com/v1/me/player/pause";

    var myOptions = {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    };

    fetch(BASE_URL, myOptions);
  };
}

export default SearchBar;
