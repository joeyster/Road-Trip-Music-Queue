import React, { Component } from "react";

class SearchBar extends Component {
  state = {};
  render() {
    return (
      // <div className="input-group">
      // <form>
      <div className="m-2">
        <input className="form-control" placeholder="Search songs" />
      </div>
    );
  }
}

export default SearchBar;
