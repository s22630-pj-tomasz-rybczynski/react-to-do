import React from "react";
import { ITask } from "../types/tasks";
import Task from "./Task";

interface TodoListProps {
  tasks: ITask[]
}

const TodoList: React.FC<TodoListProps> = ({tasks}) => {
    return (
      <>
    <div className="overflow-x-auto">
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => 
        <Task task={task} key={task.id}/>
        )}
      </tbody>
    </table>
  </div>
  </>
  );
}

export default TodoList;
