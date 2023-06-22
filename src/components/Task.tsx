import { ITask, Priority } from "../types/tasks"
import { FiEdit, FiDelete, FiCheckSquare, FiXSquare } from "react-icons/fi"
import Modal from "./Modal";
import { useCallback, useState, useEffect } from "react"
import { deleteTodo, editTodo } from "../api"
import { useTasks } from "../context/TaskContext";

interface TaskProps {
    task: ITask,
    refresh: () => void
}

const Task: React.FC<TaskProps> = ({task, refresh}) => {
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [openModalDel, setOpenModalDel] = useState(false)
    const [taskToEdit, setTaskToEdit] = useState(task.text)
    const { taskDispatch } = useTasks()

    const handleSubmitEditTodo = useCallback(() => {
        const editedTask: ITask = {
            id: task.id,
            text: taskToEdit,
            priority: task.priority,
            done: task.done,
            deadline: task.deadline
        }
        
        const editTaskAsync = async () => {
          await editTodo(editedTask)
        }
    
        editTaskAsync()
        taskDispatch({ type: 'EDIT_TASK', payload: editedTask })
        setOpenModalEdit(false)
      }, [task.deadline, task.done, task.id, task.priority, taskDispatch, taskToEdit])

    const handleDeleteTask = useCallback(() => {        
        const deleteTaskAsync = async () => {
          await deleteTodo(task.id)
        }
    
        deleteTaskAsync()
        taskDispatch({ type: 'DELETE_TASK', payload: {id: task.id} })
        setOpenModalDel(false)
      }, [task.id, taskDispatch])

    const changeTaskStatus = useCallback(() => {        
        const changeTaskStatusAsync = async () => {
            await editTodo({
                id: task.id,
                text: task.text,
                priority: task.priority,
                done: !task.done,
                deadline: task.deadline
            })
        }
    
        taskDispatch({ type: 'CHANGE_STATUS', payload: {id: task.id} })
        changeTaskStatusAsync()
      }, [task.deadline, task.done, task.id, task.priority, task.text, taskDispatch])

    const priorityColor = () => {
        switch (task.priority) {
            case Priority.LOW:
                return <p className='text-green-500'>LOW</p>
            case Priority.MEDIUM:
                return <p className='text-yellow-500'>MEDIUM</p>
            case Priority.HIGH:
                return <p className='text-red-500'>HIGH</p>
        }
    }

    useEffect(() => {
        refresh()
    },[changeTaskStatus, refresh, ])

    return (
        <tr key={task.id}>
          <td className="w-full"><p className={task.done ? "line-through" : ""}>{task.text}</p>{priorityColor()}{task.deadline.toLocaleString()}</td>
          <td className="flex gap-5">
            {task.done ? <FiXSquare className='text-yellow-500' cursor="pointer" onClick={changeTaskStatus} size={25} /> : <FiCheckSquare className='text-green-500' cursor="pointer" onClick={changeTaskStatus} size={25} />}
            <FiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className='text-blue-500' size={25}/>
            <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit} handleSubmit={handleSubmitEditTodo}>
                <h3 className='font-bold text-lg'>Edit task</h3>
                <div className='modal-action'>
                    <input
                        value={taskToEdit}
                        onChange={e => setTaskToEdit(e.target.value)}
                        type="text"
                        placeholder='Type here'
                        className='input input-bordered w-full'
                    />
                    <button type='submit' className='btn'>Submit</button>
                </div>
            </Modal>
            <FiDelete onClick={() => setOpenModalDel(true)} cursor="pointer" className='text-red-500' size={25}/>
            <Modal modalOpen={openModalDel} setModalOpen={setOpenModalDel}>
                <h3 className='font-bold text-lg'>Are you sure, you want to delete this task?</h3>
                <div className="modal-action">
                    <button onClick={handleDeleteTask} className="btn">Yes</button>
                </div>
            </Modal>
            </td>
        </tr>
    );
}

export default Task;
