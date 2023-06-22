import React, { useState } from "react"
import Task from "./Task"
import { useTasks } from "../context/TaskContext"

interface TodoListProps {
  refresh: () => void
}

const TodoList: React.FC<TodoListProps> = ({ refresh }) => {
  const [sort, setSort] = useState<"priority" | "done" | "date">("priority")
  const { taskState } = useTasks()!

  const sortTasks = () => {
    if(sort === 'priority') {
      return taskState.tasks.sort((a, b) => b.priority - a.priority).map(task => 
        <Task task={task} key={task.id} refresh={refresh}/>
        )
    } else if(sort === 'done') {
      return taskState.tasks.sort((a, _) => a.done ? -1 : 1).map(task =>
        <Task task={task} key={task.id} refresh={refresh}/>)
    } else if(sort === 'date') {
      return taskState.tasks.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()).map(task =>
        <Task task={task} key={task.id} refresh={refresh}/>)
    }
  }

  return (
      <div className="overflow-x-auto">
        <div className="btn-group">
          <input
            type="radio"
            name="options"
            data-title="PRIORITY"
            className="btn"
            onClick={() => setSort("priority")}
            checked={sort === "priority"}
          />
          <input
            type="radio"
            name="options"
            data-title="DONE"
            className="btn"
            onClick={() => setSort("done")}
            checked={sort === "done"}
          />
          <input
            type="radio"
            name="options"
            data-title="DATE"
            onClick={() => setSort("date")}
            className="btn"
          />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{sortTasks()}</tbody>
        </table>
      </div>
  )
}

export default TodoList
