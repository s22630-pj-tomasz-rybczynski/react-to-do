import React, { useState, useEffect } from "react"
import AddTask from "../components/AddTask"
import { useNavigate } from "react-router-dom"
import TodoList from "../components/TodoList"
import { getAllTodos } from "../api"
import { ITask } from "../types/tasks"
import { ReactSession } from 'react-client-session'

export default function Home() {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState<ITask[]>([])
  const user = ReactSession.get("user")

  useEffect(() => {
    getAllTodos().then(setTasks);
  }, []);

  const handleLogout = () => {
    ReactSession.remove("user")
    navigate('/login')
  };

  return (
    <main className="max-w-4xl mx-auto mt-4">
        <div className="text-center my-5 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">React ToDo list</h1>
            {user && (
              <div className="flex justify-between items-center">
                <span className="mr-2">Welcome, {user.email}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
            <AddTask />
        </div>
        <TodoList tasks={tasks}/>
    </main>
  );
}
