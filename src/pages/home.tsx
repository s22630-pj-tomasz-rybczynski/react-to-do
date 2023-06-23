import React, { useState, useEffect, useCallback } from 'react'
import AddTask from '../components/AddTask'
import { useNavigate } from 'react-router-dom'
import TodoList from '../components/TodoList'
import { addTodo, getAllTodos } from '../api'
import { ITask } from '../types/tasks'
import { ReactSession } from 'react-client-session'
import { unparse, parse } from 'papaparse'
import { useTasks } from '../context/TaskContext'

export default function Home() {
    const navigate = useNavigate()
    const [csvFile, setCsvFile] = useState<File | null>(null)
    const { taskState, taskDispatch } = useTasks()

    const user = ReactSession.get('user')

    const refreshTodos = useCallback(() => {
        if (user) {
            getAllTodos(user.id).then((tasks) => {
                taskDispatch({ type: 'SET_TASKS', payload: tasks })
            })
        }
    }, [])

    useEffect(() => {
        refreshTodos()
    }, [])

    const handleLogout = () => {
        ReactSession.remove('user')
        navigate('/login')
    }

    const handleExport = () => {
        const blob = new Blob([unparse(taskState.tasks)], {
            type: 'text/csv;charset=utf-8;',
        })

        const downloadLink = document.createElement('a')
        const url = URL.createObjectURL(blob)

        downloadLink.href = url
        downloadLink.setAttribute('download', 'tasks.csv')
        downloadLink.click()
    }

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0]
            setCsvFile(file)
        }
    }

    const handleImport = () => {
        if (csvFile) {
            const reader = new FileReader()

            reader.onload = async (event: ProgressEvent<FileReader>) => {
                if (event.target?.result) {
                    const csvData = event.target.result as string

                    const tasks = parse(csvData, {
                        header: true,
                        skipEmptyLines: true,
                        dynamicTyping: true,
                    }).data as ITask[]

                    for (const task of tasks) {
                        await addTodo(task)
                    }
                    refreshTodos()
                }
            }

            reader.readAsText(csvFile)
        }
    }

    if (user) {
        return (
            <main className="max-w-4xl mx-auto mt-4">
                <div className="text-center my-5 flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">React ToDo list</h1>
                    <div className="flex justify-between items-center">
                        <span className="mr-2">
                            Welcome, <b>{user.email}</b>
                        </span>
                        <button
                            className="text-red-500 hover:text-red-700"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                    <AddTask />
                </div>
                <TodoList refresh={refreshTodos} />
                <button className="btn mt-10" onClick={handleExport}>
                    Export Tasks to CSV
                </button>
                <div>
                    <input
                        type="file"
                        className="file-input w-full max-w-xs"
                        accept=".csv"
                        onChange={handleFileInputChange}
                    />
                    <button
                        className="btn mt-10"
                        onClick={handleImport}
                        disabled={!csvFile}
                    >
                        Import CSV
                    </button>
                </div>
            </main>
        )
    } else {
        return (
            <div className="text-center my-5 flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Unauthorized</h1>
                <span>
                    <a
                        href="/register"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                        onClick={() => navigate('/register')}
                    >
                        Register
                    </a>
                    {' or '}
                    <a
                        href="/login"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </a>
                </span>
            </div>
        )
    }
}
