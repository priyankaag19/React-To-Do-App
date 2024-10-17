import React, { useState, useEffect } from 'react';

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [filter, setFilter] = useState("all");

  // Fetch tasks from API
  useEffect(() => {
    fetch('https://run.mocky.io/v3/cb74646f-0bf9-4ba8-a167-d652a413c74b')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  // Add new task
  const addTask = () => {
    if (taskInput.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), task: taskInput, completed: false }]);
      setTaskInput("");
    }
  };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Toggle task completion
  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Filter tasks based on status
  const filteredTasks = tasks.filter(task => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // Task counter
  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="container mx-auto mt-2 p-4">
      <h1 className="text-3xl font-bold text-center mb-5">To-Do List</h1>

      <div className="mb-4">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' ? addTask() : null}
          placeholder="Enter a new task"
          className="border rounded px-4 py-2 w-full mb-2"
        />
        <button onClick={addTask} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
          Add Task
        </button>
      </div>

      <div className="mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 mx-2 rounded ${filter === "all" ? "bg-gray-300" : ""} hover:bg-gray-200`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 mx-2 rounded ${filter === "pending" ? "bg-gray-300" : ""} hover:bg-gray-200`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 mx-2 rounded ${filter === "completed" ? "bg-gray-300" : ""} hover:bg-gray-200`}
        >
          Completed
        </button>
      </div>

      {/* Task Table */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 text-left">Task</th>
            <th className="py-2">Status</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length ? filteredTasks.map(task => (
            <tr key={task.id} className="hover:bg-gray-100">
              <td className={`py-2 px-4 ${task.completed ? "line-through text-gray-500" : ""}`}>
                {task.task}
              </td>
              <td className="py-2 px-4 text-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  className="cursor-pointer"
                  onChange={() => toggleComplete(task.id)}
                />
              </td>
              <td className="py-2 px-4 text-center">
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="3" className="py-4 text-center text-gray-500">No tasks available</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-4 text-center bg-slate-400">
        <p>Total tasks: {totalCount}</p>
        <p>Completed tasks: {completedCount}</p>
      </div>
    </div>
  );
}

export default TodoApp;
