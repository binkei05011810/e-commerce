import React from 'react'
import AuthenticationWrapper from '../components/authentication/AuthenticationWrapper'
import RegisterForm from '../components/authentication/RegisterForm'

function Register() {
    return (
        <AuthenticationWrapper>
            <RegisterForm />
        </AuthenticationWrapper>
    )
}

export default Register
