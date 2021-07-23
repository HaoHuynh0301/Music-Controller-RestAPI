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

export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false
        };
        this.roomCode = this.props.match.params.roomCode;
        this.leaveRoomButtonPressed = this.leaveRoomButtonPressed.bind(this);
        this.getRoomDetail();
    }

    getRoomDetail() {
        fetch("/api/get-room" + "?code=" + this.roomCode)
            .then((response) => {
                if(!response.ok) {
                    this.props.leaveRoomCallback();
                    this.props.history.push("/");
                }
                return response.json();
            })
            .then((data)=> {
                console.log(data)
                this.setState({
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host
                });
            })
            .catch((err) => {
                console.log("Error" + err.toString());
            })
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

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Code: {this.state.roomCode}
                </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Votes: {this.state.votesToSkip}
                </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Guest Can Pause: {this.state.guestCanPause.toString()}
                </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Host: {this.state.isHost.toString()}
                </Typography>
                </Grid>
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