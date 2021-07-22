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
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.roomButtonRequest = this.roomButtonRequest.bind(this);
    }

    handleTextFieldChange(e) {
        this.setState({
            room: e.target.value
        });
    }

    roomButtonRequest() {
        const requestOption = {
            method: "POST",
            header: {"Content-Type": "application/json"},
            body: JSON.stringify({
                code: this.state.roomCode
            }),
        };
        fetch("/api/join-room", requestOption)
            .then((response) => {
                if(response.ok) {
                    this.props.history.push(`/room/${this.state.roomCode}`);
                } 
                this.setState({
                    error: "Room code is invalid!"
                });
            })
            .catch((error) => {
                console.log(error)
            })
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
                    error={this.state.error}
                    label="Code"
                    placeholder="Enter a Room Code"
                    value={this.state.roomCode}
                    helperText={this.state.error}
                    variant="outlined"
                    onChange={this.handleTextFieldChange}
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