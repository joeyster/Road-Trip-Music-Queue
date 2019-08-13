import React from "react";
import "./App.css";
import Song from "./components/Song.js";
import SearchBar from "./components/SearchBar.js";

function App() {
  return (
    <div>
      <SearchBar />
      {test()}
    </div>
  );
}

let test = () => {
  let array = ["song1", "song2", "song3", "song4", "song5"];
  let song_list = [];
  array.forEach(song => {
    // console.log(song);
    song_list.push(<Song key={song} id={song} />);
  });
  return song_list;
};

export default App;
