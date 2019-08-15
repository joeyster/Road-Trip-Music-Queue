import React, { Component } from "react";

class MenuBar extends Component {
  state = {};
  render() {
    return (
      <footer className="fixed-bottom row">
        <div className="col padding-0">
          <button className="btn btn-primary btn-block rounded-0">
            {/* <img src="./favicon.ico" width="30" height="30" alt="queue" /> */}
            queue
          </button>
        </div>
        <div className="col padding-0">
          <button className="btn btn-dark btn-block rounded-0">
            {/* <img src="./favicon.ico" width="30" height="30" alt="search" /> */}
            search
          </button>
        </div>
        <div className="col padding-0">
          <button className="btn btn-primary btn-block rounded-0">
            {/* <img src="./favicon.ico" width="30" height="30" alt="library" /> */}
            library
          </button>
        </div>
      </footer>
    );
  }
}

export default MenuBar;
