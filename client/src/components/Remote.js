import React, { Component } from "react";
import ReactDOM from "react-dom";
import SearchBar from "./SearchBar.js";
import MenuBar from "./MenuBar.js";

ReactDOM.render(<MenuBar />, document.getElementById("footer"));

class Remote extends Component {
  // console.log(this.props.access_token);
  state = {};
  render() {
    return <SearchBar />;
  }
}

export default Remote;
