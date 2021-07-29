import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Grid } from "@material-ui/core";
import CreateRoomPage from "./CreateRoomPage.js";

export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
            showSettings: false,
            spotifyAuthenticated: false,
            song: {}
        };
        this.roomCode = this.props.match.params.roomCode;
        this.leaveRoomButtonPressed = this.leaveRoomButtonPressed.bind(this);
        this.updateShowSettings = this.updateShowSettings.bind(this);
        this.renderSettings =  this.renderSettings.bind(this);
        this.renderSettingsButton = this.renderSettingsButton.bind(this);
        this.getRoomDetail = this.getRoomDetail.bind(this);
        this.authenticateSpotify = this.authenticateSpotify.bind(this);
        this.getCurrentSong = this.getCurrentSong.bind(this);
        this.getRoomDetail();
    }

    getCurrentSong() {
        // fetch("/spotify/current-song").then((response) => {
        //     if(!response.ok) {
        //         return {};
        //     } else {
        //         return response.json();
        //     }
        // }).then((data) => this.setState({
        //     song: data
        // })).catch((err) => {
        //     console.log(err);
        // });
    }

    authenticateSpotify() {
        fetch('/spotify/is-authenticated')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    spotifyAuthenticated: data.status
                });
                console.log(data.status);
                if(data.status) {
                    fetch('/spotify/get-auth-url')
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data.url);
                            window.location.replace(data.url);
                        });
                }
            })
            .catch((err) => {
                console.log("Spotify error" + err);
            });
    }

    getRoomDetail() {
        return(
            fetch("/api/get-room" + "?code=" + this.roomCode)
                .then((response) => {
                    if(!response.ok) {
                        this.props.leaveRoomCallback();
                        this.props.history.push("/");
                    }
                    return response.json();
                })
                .then((data)=> {
                    this.setState({
                        votesToSkip: data.votes_to_skip,
                        guestCanPause: data.guest_can_pause,
                        isHost: data.is_host
                    });
                    if(this.state.isHost) {
                        this.authenticateSpotify();
                    }
                })
                .catch((err) => {
                    console.log("Error" + err.toString());
                })
        );

    }

    leaveRoomButtonPressed() {
        const requestOption = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
        fetch('/api/leave-room/', requestOption)
            .then((response) => {
                this.props.history.push('/');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    updateShowSettings(value) {
        this.setState({
            showSettings: value,
        });
    }


    renderSettings() {
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <CreateRoomPage
                        update={true}
                        votesToSkip={this.state.votesToSkip}
                        guestCanPause={this.state.guestCanPause}
                        roomCode={this.roomCode}
                        updateCallback={this.getRoomDetail}
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => this.updateShowSettings(false)}
                    >
                        Close
                    </Button>
                </Grid>
            </Grid>
        );

    }

    renderSettingsButton() {
        return(
            <Grid item xs={12} align="center">
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => this.updateShowSettings(true)}
                >
                    Setting
                </Button>
            </Grid>
        );
    }

    render() {
        if (this.state.showSettings) {
            return this.renderSettings();
        }
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Code: {this.roomCode}
                    </Typography>
                </Grid>
                {this.state.song}
                {this.state.isHost ? this.renderSettingsButton() : console.log("You are not a host")}
                <Grid item xs={12} align="center">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick = {this.leaveRoomButtonPressed}
                    >
                        Leave Room
                    </Button>
                </Grid>
            </Grid>
        )
    }
}