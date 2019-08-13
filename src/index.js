import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import MenuBar from "./components/MenuBar";

ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(<MenuBar />, document.getElementById("footer"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
