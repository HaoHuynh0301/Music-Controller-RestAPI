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

export default class RoomJoinPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: "",
            error: ""
        }
        this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
        this.roomButtonRequest = this.roomButtonRequest.bind(this);
    }

    _handleTextFieldChange(e) {
        console.log(e.target.value)
        this.setState({
            roomCode: e.target.value
        });
    }

    roomButtonRequest() {
        const requestOption = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                code: this.state.roomCode,
            }),
        };
        // console.log(this.RequestOption);
        fetch("http://127.0.0.1:5500/api/join-room/", requestOption)
            .then((response) => {
                if(response.ok) {
                    this.props.history.push(`/room/${this.state.roomCode}`);
                    console.log("OK")
                } else {
                    this.setState({
                        error: "Room not found."
                    });
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
    
    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Join a Room
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <TextField
                        value={this.state.roomCode}
                        error={this.state.error}
                        label="Code"
                        placeholder="Enter a Room Code"
                        value={this.state.roomCode}
                        helperText={this.state.error}
                        variant="outlined"
                        onChange={this._handleTextFieldChange}
                    />
                </Grid>
                <Grid item xs={12} align="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.roomButtonRequest}
                >
                    Enter Room
                </Button>
                </Grid>
                <Grid item xs={12} align="center">
                <Button variant="contained" color="secondary" to="/" component={Link}>
                    Back
                </Button>
                </Grid>
            </Grid>
        )
    }
}