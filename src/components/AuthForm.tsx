import React, { FormEventHandler } from 'react'
import { NavigateFunction } from 'react-router'

interface AuthFormProps {
    formType: 'login' | 'register'
    handleSubmit: FormEventHandler<HTMLFormElement>
    setEmail: React.Dispatch<React.SetStateAction<string>>
    setPassword: React.Dispatch<React.SetStateAction<string>>
    error: string
    navigate: NavigateFunction
}

const AuthForm: React.FC<AuthFormProps> = ({
    formType,
    handleSubmit,
    setEmail,
    setPassword,
    error,
    navigate,
}) => {
    return (
        <div className="relative flex flex-col justify-center h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-gray-700">
                    {formType === 'login' ? 'Login' : 'Register'}
                </h1>
                {error && (
                    <p className="text-red-500 text-center pt-2">{error}</p>
                )}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Email</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Email Address"
                            className="w-full input input-bordered"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">
                                Password
                            </span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="w-full input input-bordered"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className="btn btn-block" type="submit">
                            {formType === 'login' ? 'Login' : 'Register'}
                        </button>
                    </div>
                    <div className="text-center">
                        {formType === 'login' ? (
                            <span>
                                Don't have an account?{' '}
                                <a
                                    href="/register"
                                    className="text-blue-600 hover:text-blue-800 hover:underline"
                                    onClick={() => navigate('/register')}
                                >
                                    Register
                                </a>
                            </span>
                        ) : (
                            <span>
                                Already have an account?{' '}
                                <a
                                    href="/login"
                                    className="text-blue-600 hover:text-blue-800 hover:underline"
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </a>
                            </span>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AuthForm
