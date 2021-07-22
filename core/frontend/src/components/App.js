import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage.js"
import RoomJoinPage from "./RoomJoinPage.js";
import CreateRoomPage from "./CreateRoomPage.js";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="center">
        <HomePage />
      </div>
      
    );
  }
}

const appDiv = document.getElementById("app");
render(<App name = "hao"/> , appDiv);