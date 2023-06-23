import { getAllUsers, addUser } from '../api'
import { useNavigate } from 'react-router-dom'
import { IUser } from '../types/users'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import AuthForm from '../components/AuthForm'

const Register = () => {
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegistration = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const users: IUser[] = await getAllUsers()
            const existingUser: IUser | undefined = users.find(
                (u) => u.email === email
            )

            if (existingUser) {
                setError('User with this email already exists')
            } else {
                const hashedPassword: string = await bcrypt.hash(password, 10)
                const newUser: IUser = {
                    id: uuidv4(),
                    email,
                    password: hashedPassword,
                }

                await addUser(newUser)

                navigate('/login')
            }
        } catch (error) {
            console.error('Registration error:', error)
            setError('Registration failed. Please try again later.')
        }
    }

    return (
        <AuthForm
            formType="register"
            handleSubmit={handleRegistration}
            setEmail={setEmail}
            setPassword={setPassword}
            error={error}
            navigate={navigate}
        />
    )
}

export default Register
