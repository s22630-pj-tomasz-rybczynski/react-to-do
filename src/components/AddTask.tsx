import {AiOutlinePlus} from 'react-icons/ai'
import Modal from './Modal'
import { FormEventHandler, useState } from 'react'
import { addTodo } from '../api'
import { Priority } from '../types/tasks'
import { v4 as uuidv4 } from 'uuid'
import CustomDatePicker from './DatePicker'

interface AddTaskProps {
    refresh: () => void
}

const AddTask: React.FC<AddTaskProps>  = ({refresh}) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [newTaskValue, setNewTaskValue] = useState('')
    const [priority, setPriority] = useState<Priority>(Priority.MEDIUM)
    const [date, setDate] = useState<Date | null>(new Date())

    const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async e => {
        e.preventDefault()
        if(newTaskValue === '') return
        await addTodo({
            id: uuidv4(),
            text: newTaskValue,
            priority: priority,
            done: false,
            deadline: date ? date : new Date()
        })
        setNewTaskValue('')
        setModalOpen(false)
        refresh()
    };
    
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
            <div className="modal-action">
                <input
                    value={newTaskValue}
                    onChange={(e) => setNewTaskValue(e.target.value)}
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                />
                <input type="radio" name="priority" className="radio radio-success" onClick={() => setPriority(Priority.LOW)} />
                <input type="radio" name="priority" className="radio radio-warning" onClick={() => setPriority(Priority.MEDIUM)} />
                <input type="radio" name="priority" className="radio radio-error" onClick={() => setPriority(Priority.HIGH)} />
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
            <div className="modal-action">
            <CustomDatePicker
                selectedDate={date}
                onChange={(date) => setDate(date)}
            />
            </div>
          </Modal>
        </div>
      )
    }    

export default AddTask;
