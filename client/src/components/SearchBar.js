import React, { Component } from "react";
import fetch from "node-fetch";

let accessToken =
  // "BQByU6q2tXGM3uicw01SFry8SzeiNZZXAd9LA4Fv0KAZtt_2k0-BhWDkWC5jAI0_9GSpo-J7kpM7LUY0QAFYJ9fDc3x-o9pG8DUQpV1i9p-LXOLYiNpeVqTrmi2hsv-yrLTaDqi8rw-nQ8zY842HNBybN1kO9RQhFaXu9EP3a-USyxNvnb_UYU--PSYLug";
  "BQBXPotUpSN-U9STK54HWvOXK3C0tLobG3FBaV78rnESm6UawNyzoEw63xpa6UMQxi6yoIzMADlWVNCW4Pp6iSqGzbE1VY1h840oe5R9mzWYXqmAUOVVKPMVppeDoMMAUeeU0RsiIRbjIx8Jqdex-IipZZMKdtmBP6n0z8G4Q7s2f8Cxvk7D9nULLvPHwfteJg";

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
      // mode: "cors",
      // cache: "default"
    };

    fetch(BASE_URL, myOptions);
  };
}

export default SearchBar;
