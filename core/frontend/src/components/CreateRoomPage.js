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
import { Collapse } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export default class CreateRoomPage extends Component {
    static defaultProps = {
        votesToSkip: 2,
        guestCanPause: true,
        update: false,
        roomCode: null,
        updateCallBack: () => {}
    }
    constructor(props) {
        super(props);
        this.state = {
            guestCanPause: this.props.guestCanPause,
            votesToSkip: this.props.votesToSkip,
            errorMsg: "",
            successMsg: "",
        }
        this.handleRoomButtonPress = this.handleRoomButtonPress.bind(this);
        this.handleVotesChanged = this.handleVotesChanged.bind(this);
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
        this.handleUpdateButtonPressed = this.handleUpdateButtonPressed.bind(this);
        this.renderNotification = this.renderNotification.bind(this);
    }

    handleVotesChanged(e) {
        this.setState({
            votesToSkip: e.target.value,
        });
    }

    handleGuestCanPauseChange(e) {
        this.setState({
            guestCanPause: e.target.value == "true" ? true : false,
        });
    }

    handleRoomButtonPress() {
        const requestOption = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause,
            }),
        };
        fetch("/api/create-room/", requestOption)
            .then((response) => response.json())
            .then((data) => {
                console.log("Create new room successfully !");
                this.props.history.push(`/room/${data.code}`);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    handleUpdateButtonPressed() {
        const requestOption = {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause,
                code: this.props.roomCode,
            }),
        };
        fetch("/api/update-room/", requestOption)
            .then((response) => {
                if(response.ok) {
                    this.setState({
                        successMsg: "Update successfully"
                    });
                    console.log("Update successfully!");
                } else {    
                    this.setState({
                        errorMsg: "Update unsuccessfully!"
                    });
                    console.log("Update unsuccessfully!");
                }
                this.props.updateCallBack();
            });
    }

    renderCreatButton() {
        return(
            <Grid spacing={1} container>
                <Grid item xs={12} align="center">
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={this.handleRoomButtonPress}
                    >
                        Create A Room
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" to="/" component={Link}>
                        Back
                    </Button>
                </Grid>
            </Grid>
        );
    }

    renderUpdateButton() {
        return(
            <Grid item xs={12} align="center">
                <Button
                    color="primary"
                    variant="contained"
                    onClick={this.handleUpdateButtonPressed}
                >
                    Update a room
                </Button>
            </Grid>
        );
    }

    renderNotification() {
        <Grid item xs={12} align="center">
            <Collapse in = {this.state.successMsg != "" || this.state.errorMsg != ""}>
                {this.state.successMsg != "" 
                ? (<Alert severity="success" onClose={() => {
                    this.setState({
                        successMsg: ""
                    });
                }}>{this.state.successMsg}</Alert>)
                :(
                    (<Alert severity="error" onClose={() => {
                        this.setState({
                            errorMsg: ""
                        });
                    }}>{this.state.errorMsg}</Alert>)
                )}
            </Collapse>
        </Grid>
    }

    render() {
        const title = this.props.update ? "Update Room" : "Create a Room";
        return (
           <Grid container spacing={1}>
               {/* {this.props.update ? this.renderNotification() : console.log("Create")} */}
                <Grid item xs={12} align="center">
                    <Collapse in = {this.state.successMsg != "" || this.state.errorMsg != ""}>
                        {this.state.successMsg != "" 
                        ? (<Alert severity="success" onClose={() => {
                            this.setState({
                                successMsg: ""
                            });
                        }}>{this.state.successMsg}</Alert>)
                        :(
                            (<Alert severity="error" onClose={() => {
                                this.setState({
                                    errorMsg: ""
                                });
                            }}>{this.state.errorMsg}</Alert>)
                        )}
                    </Collapse>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                    {title}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText>
                            <div align="center">Guest Control of Playback State</div>
                        </FormHelperText>
                        <RadioGroup
                            row
                            defaultValue={this.props.guestCanPause.toString()}
                            onChange={this.handleGuestCanPauseChange}
                        >
                            <FormControlLabel
                                value="true"
                                control={<Radio color="primary" />}
                                label="Play/Pause"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel
                                value="false"
                                control={<Radio color="secondary" />}
                                label="No Control"
                                labelPlacement="bottom"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField required="true"
                            type="number"
                            defaultValue={this.state.votesToSkip}
                            inputPro={{
                                min: 1,
                                style: {
                                    textAlign: "center" 
                                }
                            }}
                            onChange={this.handleVotesChanged}
                        />
                        <FormHelperText>
                            <div align="center">Votes required to skip</div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                {this.props.update
                ? this.renderUpdateButton()
                : this.renderCreatButton()
                }
           </Grid>
        )
    }
}