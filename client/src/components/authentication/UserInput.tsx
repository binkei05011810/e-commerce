import React from 'react';
import GoogleLogin from 'react-google-login'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%"
    },

    label: {
        fontFamily: "Poppins, sans-serif",
        color: "#01b7ee",
        fontSize: "0.8rem",
        marginBottom: "12px",
        marginLeft: "15px"
    },

    inputRoot: {
        width: "100%",
        marginBottom: "20px",

        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
            borderColor: "#01b7ee"
        },
    },

    fieldRoot: {
        height: "40px",

        '&$focused $notchedOutline': {
            borderColor: "#01b7ee",
        }
    },

    input: {
        outline: "none",
        color: "white",
        fontFamily: "Poppins, sans-serif"
    },

    notchedOutline: {
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: "48px"
    },

    focused: {
        "& $notchedOutline": {
            borderColor: "#01b7ee"
        }
    }
}));

type Props = {
    label: string
    type: string
}
export default function UserInput({ label, type }: Props) {
    const classes = useStyles();

    return (
        <div className="root">
            <InputLabel htmlFor={label} className={classes.label}>{label}</InputLabel>
            <TextField id={label}
                variant="outlined"
                type={type}
                className={classes.inputRoot}
                InputProps={{
                    classes: {
                        root: classes.fieldRoot,
                        input: classes.input,
                        notchedOutline: classes.notchedOutline,
                        focused: classes.focused
                    },
                }} />
        </div>
    );
}