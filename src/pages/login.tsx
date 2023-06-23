import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bcrypt from 'bcryptjs'
import { getAllUsers } from '../api'
import { IUser } from '../types/users'
import { ReactSession } from 'react-client-session'
import AuthForm from '../components/AuthForm'

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const users: IUser[] = await getAllUsers()
            const user = users.find((u) => u.email === email)

            if (user) {
                const isPasswordValid = await bcrypt.compare(
                    password,
                    user.password
                )

                if (isPasswordValid) {
                    ReactSession.set('user', user)
                    navigate('/')
                } else {
                    setError('Invalid password')
                }
            } else {
                setError('Invalid email or password')
            }
        } catch (error) {
            console.error('Login error:', error)
            setError('Login failed. Please try again later.')
        }
    }

    return (
        <AuthForm
            formType="login"
            handleSubmit={handleLogin}
            setEmail={setEmail}
            setPassword={setPassword}
            error={error}
            navigate={navigate}
        />
    )
}

export default Login
