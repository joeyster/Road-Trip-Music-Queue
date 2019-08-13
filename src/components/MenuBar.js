import React, { Component } from "react";

class MenuBar extends Component {
  state = {};
  render() {
    return (
      <footer className="fixed-bottom row">
        <div className="col padding-0">
          <button className="btn btn-primary btn-block rounded-0">
            <img
              src="./favicon.ico"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="logo"
            />
          </button>
        </div>
        <div className="col padding-0">
          <button className="btn btn-dark btn-block rounded-0">
            <img
              src="./favicon.ico"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="logo"
            />
          </button>
        </div>
        <div className="col padding-0">
          <button className="btn btn-primary btn-block rounded-0">
            <img
              src="./favicon.ico"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="logo"
            />
          </button>
        </div>
      </footer>
    );
  }
}

export default MenuBar;
