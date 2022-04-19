import React from 'react';
import GoogleLogin from 'react-google-login'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';

import GoogleButton from './GoogleButton';

const useStyles = makeStyles((theme) => ({
    root: {
        background: "black",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
}));

type Props = {
    children: any
}
export default function AuthenticationWrapper({ children }: Props) {
    const classes = useStyles();

    // The user will be redirect to google login page
    // After the user give the authentication, google will send back the id token
    // The token will be in the response => Send the token id to the back end
    // The backend will verify with google and check that whether the token id is valid
    const responseGoogle = async (response: any) => {
        const tokenData = await axios.post('/users/login', { id_token: response.tokenId })
        console.log(tokenData.data.token)
        await axios.get('/products',
            { headers: { Authorization: `Bearer ${tokenData.data.token}` } })
    }

    return (
        <div className={classes.root}>
            <div>
                {children}
                <GoogleLogin
                    clientId="437830460149-iur704dl757e07g9sksio2hg9usf3dsg.apps.googleusercontent.com"
                    render={renderProps => (
                        <GoogleButton onClick={renderProps.onClick} />
                    )}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        </div>
    );
}