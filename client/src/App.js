import React from "react";
import "./App.css";
import Playlist from "./components/Playlist";
import LogIn from "./components/LogIn";

function App() {
  return (
    <div>
      <LogIn />
    </div>
  );
}

// let create_playlist_list = () => {
//   let array = ["playlist1", "playlist2", "playlist3", "playlist4", "playlist5"];
//   let playlist_list = [];
//   array.forEach(playlist => {
//     playlist_list.push(<Playlist key={playlist} id={playlist} />);
//   });
//   return playlist_list;
// };

export default App;
