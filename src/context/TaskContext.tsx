import React, {
    PropsWithChildren,
    createContext,
    useContext,
    useReducer,
  } from 'react'
import { ITask } from '../types/tasks'

interface TaskState {
    tasks: ITask[]
}

type TaskAction =
  | { type: 'ADD_TASK'; payload: ITask }
  | { type: 'SET_TASKS'; payload: ITask[] }
  | { type: 'EDIT_TASK'; payload: ITask }
  | { type: 'DELETE_TASK'; payload: { id: string } }
  | { type: 'CHANGE_STATUS'; payload: { id: string } }

interface TasksContextType {
    taskState: TaskState
    taskDispatch: React.Dispatch<TaskAction>
}

export const TasksContext = createContext<TasksContextType>({
    taskState: {tasks: []},
    taskDispatch: () => {}
    })

export function useTasks() {
  return useContext(TasksContext)
}

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
    switch (action.type) {
      case 'ADD_TASK':
        return { tasks: [...state.tasks, action.payload] }
      case 'SET_TASKS':
        return { tasks: action.payload }
      case 'EDIT_TASK':
        return { tasks: state.tasks.map((task) => task.id === action.payload.id ? action.payload : task) }
      case 'DELETE_TASK':
        return { tasks: state.tasks.filter((task) => task.id !== action.payload.id) }
      case 'CHANGE_STATUS':
        return { tasks: state.tasks.map((task) => task.id === action.payload.id ? {...task, done: !task.done} : task) }
      default:
        return state
    }
  }
  
export const TasksProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [taskState, taskDispatch] = useReducer(taskReducer, {
        tasks: []
    })

    const tasksContextValue: TasksContextType = {
        taskState,
        taskDispatch,
    }

    return (
        <TasksContext.Provider value={tasksContextValue}>
            {children}
        </TasksContext.Provider>
    )
}
