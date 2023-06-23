import { AiOutlinePlus } from 'react-icons/ai'
import Modal from './Modal'
import { useState, useCallback } from 'react'
import { addTodo } from '../api'
import { ITask, Priority } from '../types/tasks'
import { v4 as uuidv4 } from 'uuid'
import CustomDatePicker from './DatePicker'
import { ReactSession } from 'react-client-session'
import { useTasks } from '../context/TaskContext'

const AddTask: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [newTaskValue, setNewTaskValue] = useState('')
  const [priority, setPriority] = useState<Priority>(Priority.MEDIUM)
  const [date, setDate] = useState<Date | null>(new Date())
  const { taskDispatch } = useTasks()
  const user = ReactSession.get("user")

  const handleSubmitNewTodo = useCallback(() => {
    const task: ITask = {
      id: uuidv4(),
      text: newTaskValue,
      priority: priority,
      done: false,
      deadline: date ? date : new Date(),
      user_id: user.id
    }

    addTodo(task).then(() => {
      taskDispatch({ type: 'ADD_TASK', payload: task })
      setNewTaskValue('')
      setModalOpen(false)
      }
    )
  }, [newTaskValue, priority, date, user.id, taskDispatch])

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full"
      >
        Add new task <AiOutlinePlus size={18} className="ml-2" />
      </button>
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        handleSubmit={handleSubmitNewTodo}
      >
        <h3 className="font-bold text-lg">Add new task</h3>
        <div className="modal-action flex flex-col">
          <div className="flex items-center gap-3">
            <input
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
            <CustomDatePicker
              selectedDate={date}
              onChange={(date) => setDate(date)}
            />
          </div>
          <div className="flex items-center gap-2 mt-4">
            <input
              type="radio"
              name="priority"
              className="radio radio-success"
              onClick={() => setPriority(Priority.LOW)}
            />
            <input
              type="radio"
              name="priority"
              className="radio radio-warning"
              onClick={() => setPriority(Priority.MEDIUM)}
            />
            <input
              type="radio"
              name="priority"
              className="radio radio-error"
              onClick={() => setPriority(Priority.HIGH)}
            />
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </div>
        <div className="modal-action"></div>
      </Modal>
    </div>
  )
}

export default AddTask
