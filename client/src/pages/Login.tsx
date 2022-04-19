import React from 'react'
import AuthenticationWrapper from '../components/authentication/AuthenticationWrapper'
import LoginForm from '../components/authentication/LoginForm'

function Login() {
    return (
        <AuthenticationWrapper>
            <LoginForm />
        </AuthenticationWrapper>
    )
}

export default Login
