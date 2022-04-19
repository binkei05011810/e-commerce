import React from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import UserInput from './UserInput';
import CustomButton from '../CustomButton';

const useStyles = makeStyles((theme) => ({
    form: {
        width: "300px"
    },

    google: {
        height: "45px !important",
        borderRadius: "20px !important",
        width: "100% !important",
        textAlign: "center",
        margin: 0,
        overflow: "hidden",
        fontFamily: "Poppins, sans-serif !important",
        fontSize: "0.9rem !important",
        "& svg": {
        }
    }
}));

export default function LoginForm() {
    const classes = useStyles();

    const login = () => {

    }

    return (
        <form className={classes.form} noValidate autoComplete="off">
            <UserInput label="Username" type="text" />
            <UserInput label="Password" type="password" />
            <CustomButton text={"login"} handleClick={login} />
        </form>
    );
}