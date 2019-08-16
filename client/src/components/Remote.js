import React, { Component } from "react";
import ReactDOM from "react-dom";
import SearchBar from "./SearchBar.js";
import MenuBar from "./MenuBar.js";

ReactDOM.render(<MenuBar />, document.getElementById("footer"));

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
