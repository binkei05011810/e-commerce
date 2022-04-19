import React from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Login from './authentication/LoginForm';

const useStyles = makeStyles((theme) => ({
    root: {
        background: "#01b7ee",
        textTransform: "capitalize",
        color: "black",
        fontFamily: "Poppins, sans-serif",
        height: "45px",
        width: "100%",
        borderRadius: "20px",
        marginBottom: "20px"
    },
}));

type Props = {
    text: string
    handleClick: () => void
}

function CustomButton({ text, handleClick }: Props) {
    const classes = useStyles();

    return (
        <Button
            variant="contained"
            color="primary"
            className={classes.root}
            onClick={handleClick}
        >
            {text}
        </Button>
    )
}

export default CustomButton
