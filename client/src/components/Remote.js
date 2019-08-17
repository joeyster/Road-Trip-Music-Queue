import React, { Component } from "react";
import SearchBar from "./SearchBar.js";

class Remote extends Component {
  // console.log(this.props.access_token);
  state = { access_token: this.props.access_token };
  render() {
    return (
      <div>
        <SearchBar access_token={this.state.access_token} />
      </div>
    );
  }
}

export default Remote;
