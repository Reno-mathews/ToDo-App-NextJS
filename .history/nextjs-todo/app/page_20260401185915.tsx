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

          <div className="flex gap-2">
            <select
              className="border p-2 rounded-lg flex-1"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <input 
              type="date"
              className="border p-2 rounded-lg flex-1"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />

            </div>
          <button
            className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600 transition"
            onClick={addTask}>
              Add Task
            </button>
        </div>
      
    
      {/* Filters */}
      <div className="flex jusitfy-center gap-2 mb-4">
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === f
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
            }`}
            >
              {f}
            </button>
        ))}
      </div>

      {/* Task List */}
      <ul className="space-y-3">
        {filteredTasks.map((task) => (
          <li 
            key={task.id}
            className="flex justify-betwenn items-center bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div>
              <p
                onClick={() => toggleTask(task.id)}
                className={`cursor-pointer font-medium ${
                  task.completed
                  ?"line-through text-gray-400"
                  :""
                }`}
                >
                  {task.title}
                </p>

                <div className="text-xs mt-1 flex gap-2">
                  {/* Priority Badge */}

                  <span 
                    className={`px-2 py-1 rounded-full text-white ${
                      task.priority === "high"
                        ? "bg-red-500"
                        : task.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {task.priority}
                  </span>

                  {/* Due Date */}
                  {task.dueDate && (
                    <span className="text-gray-500">
                      {task.dueDate}
                    </span>
                  )}
                </div>
            </div>
}

