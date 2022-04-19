import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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

    googleLogo: {
        width: "25px"
    }
}));

type Props = {
    onClick: () => void
}

function GoogleButton({ onClick }: Props) {
    const classes = useStyles();
    return (
        <Button
            variant="contained"
            color="primary"
            className={classes.root}
            onClick={onClick}
            startIcon={<img className={classes.googleLogo} src="https://image.flaticon.com/icons/png/512/2702/2702602.png" alt="google" />}>
            Login with Google</ Button >
    )
}

export default GoogleButton
