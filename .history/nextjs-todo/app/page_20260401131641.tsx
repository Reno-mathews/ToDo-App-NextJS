"use client";

import { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high"
  dueDate: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchTasks = async() => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async() => {
    if (!title) return;

    await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ 
        title,
        priority,
        dueDate,
       }),
    });

    setTitle("");
    setPriority("low");
    setDueDate("");
    fetchTasks();
  };

  const toggleTask = async (id: number) => {
    await fetch("/api/tasks", {
        method: "PATCH",
        body: JSON.stringify({ id }),
    });

    fetchTasks();
};

const deleteTask = async (id: number) => {
  await fetch("/api/tasks", {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });

  fetchTasks();
}

const filteredTasks = tasks.filter((task) => {
  if (filter === "active") return !task.completed;
  if (filter=== "completed") return task.completed;
  return true;
});
  useEffect(() => {
    fetchTasks();
  }, []);

  return (

      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">

          <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>
        
          <div className="flex gap-2 mb-4">
          <input
            className="border p-2 flex-1 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task"
          />

          <button
            className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
            onClick={addTask}>
              Add
            </button>
        </div>
      </div>
    

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              onClick={() => toggleTask(task.id)}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
          >
            {task.title}
          </span>

          <button onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

