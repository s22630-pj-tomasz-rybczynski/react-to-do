import { ITask, Priority } from "../types/tasks"
import { FiEdit, FiDelete, FiCheckSquare, FiXSquare } from "react-icons/fi"
import Modal from "./Modal";
import { FormEventHandler, useState } from "react"
import { deleteTodo, editTodo } from "../api"

interface TaskProps {
    task: ITask,
    refresh: () => void
}

const Task: React.FC<TaskProps> = ({task, refresh}) => {
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDel, setOpenModalDel] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(task.text);

    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async e => {
        await editTodo({
            id: task.id,
            text: taskToEdit,
            priority: task.priority,
            done: task.done,
        })
        setOpenModalEdit(false)
        refresh()
    }

    const handleDeleteTask = async (id: string) => {
        await deleteTodo(id)
        setOpenModalDel(false)
        refresh()
    }

    const changeTaskStatus = async () => {
        await editTodo({
            id: task.id,
            text: task.text,
            priority: task.priority,
            done: !task.done
        })
        refresh()
    }

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

    return (
        <tr key={task.id}>
          <td className={task.done ? "w-full line-through" : "w-full"}>{task.text}{priorityColor()}</td>
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
                    <button onClick={() => handleDeleteTask(task.id)} className="btn">Yes</button>
                </div>
            </Modal>
            </td>
        </tr>
    );
}

export default Task;
