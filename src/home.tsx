import React, {useState, useEffect} from "react";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import { getAllTodos } from "./api";
import { ITask } from "./types/tasks";

export default function Home() {

  let [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {

      async function fetchTasks() {
        const data = await getAllTodos();

        setTasks(data);
      }

      if(tasks.length === 0) {
        fetchTasks();
      }
    }, [tasks]);
    
  return (
    <main className="max-w-4xl mx-auto mt-4">
        <div className="text-center my-5 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">React ToDo list</h1>
            <AddTask />
        </div>
        <TodoList tasks={tasks}/>
    </main>
  );
};
