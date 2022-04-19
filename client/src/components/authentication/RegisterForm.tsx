import React from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';

import UserInput from './UserInput';
import CustomButton from '../CustomButton';

const useStyles = makeStyles((theme) => ({
    form: {
        width: "300px"
    }
}));

export default function RegisterForm() {
    const classes = useStyles();

    const register = () => {

    }
    return (
        <form className={classes.form} noValidate autoComplete="off">
            <UserInput label="Firstname" type="text" />
            <UserInput label="Lastname" type="text" />
            <UserInput label="Username" type="text" />
            <UserInput label="Password" type="password" />
            <CustomButton text={"Register"} handleClick={register} />
        </form>
    );
}