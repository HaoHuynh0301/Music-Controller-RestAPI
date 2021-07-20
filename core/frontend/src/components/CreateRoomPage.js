import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Grid } from "@material-ui/core";

export default class CreateRoomPage extends Component {
    defaultVotes = 2
    constructor(props) {
        super(props);
    }

    render() {
        return (
           <Grid container spacing={1}>
               <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        Create A Room
                    </Typography>
               </Grid>
           </Grid>
        )
    }
}