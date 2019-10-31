import React, { Component } from "react";

class Song extends Component {
  state = {
    uri: this.props.uri,
    name: this.props.name,
    artist: this.props.artist
  };

  componentDidUpdate(prevProps) {
    //function called upon updation
    //needed because updation did not change the props in the UI
    if (this.props.uri !== prevProps.uri) {
      this.setState({
        uri: this.props.uri,
        name: this.props.name,
        artist: this.props.artist
      });
    }
  }

  render() {
    return (
      <div className="row m-2">
        <div className="col-10 pr-0">
          <button className="btn btn-secondary btn-block text-left">
            {this.state.name} by {this.state.artist}
          </button>
        </div>
        <div className="col-2 pl-2">
          <button className="btn btn-block text-center btn-dark">+</button>
        </div>
      </div>
    );
  }
}

export default Song;
