import { ITask } from './types/tasks'
import { IUser } from './types/users'

const baseUrl = 'https://to-do-json-server.vercel.app'

export const getAllTodos = async (userId: string): Promise<ITask[]> => {
    const res = await fetch(`${baseUrl}/tasks?user_id=${userId}`, {
        cache: 'no-store',
    })

    return await res.json()
}

export const addTodo = async (todo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseUrl}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    })

    return await res.json()
}

export const editTodo = async (todo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    })

    return await res.json()
}

export const deleteTodo = async (id: string): Promise<void> => {
    await fetch(`${baseUrl}/tasks/${id}`, {
        method: 'DELETE',
    })
}

export const getAllUsers = async (): Promise<IUser[]> => {
    const res = await fetch(`${baseUrl}/users`, { cache: 'no-store' })

    return await res.json()
}

export const addUser = async (user: IUser): Promise<IUser> => {
    const res = await fetch(`${baseUrl}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })

    return await res.json()
}
