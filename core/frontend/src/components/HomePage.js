import React, {Component} from "react";
import RoomJoinPage from "./RoomJoinPage.js";
import CreateRoomPage from "./CreateRoomPage.js";
import Room from "./Room.js"
import { BrowserRouter as Router, 
    Switch, 
    Route, 
    Link, 
    Redirect} 
from "react-router-dom";

export default class HomePage extends Component {
    defaultVotes = 2
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">This is a HomePage</Route>
                    <Route path="/join" component={RoomJoinPage}></Route>
                    <Route path="/create" component={CreateRoomPage}></Route>
                    <Route path="/room/:roomCode" component={Room}></Route>
                </Switch>
            </Router>
        )
    }
}