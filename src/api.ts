import { ITask } from './types/tasks'

const baseUrl = 'http://localhost:3001';

export const getAllTodos = async (): Promise<ITask[]> => {
    const res = await fetch(`${baseUrl}/tasks`, {cache: 'no-store'});

    return await res.json();
};

export const addTodo = async (todo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseUrl}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo)
        }
    );

    return await res.json();
};
