import React, { useState, useEffect } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    fetch("http://localhost:8081/todos")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = () => {
    if (!task) return;
    fetch("http://localhost:8081/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    }).then(() => {
      setTasks([...tasks, { task, done: false }]);
      setTask("");
    });
  };

  const toggleTask = (id) => {
    fetch(`http://localhost:8081/todos/${id}`, { method: "PUT" }).then(() => {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
      );
    });
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:8081/todos/${id}`, { method: "DELETE" }).then(() => {
      setTasks(tasks.filter((t) => t.id !== id));
    });
  };

  const editTask = (id) => {
    const updated = prompt("Edit task:");
    if (!updated) return;
    fetch(`http://localhost:8081/todos/edit/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: updated }),
    }).then(() => {
      setTasks(tasks.map((t) => (t.id === id ? { ...t, task: updated } : t)));
    });
  };

  return (
    <div className="card">
      <h2>To-Do List</h2>
      <input
        type="text"
        placeholder="New task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((t) => (
          <li key={t.id} style={{ textDecoration: t.done ? "line-through" : "none" }}>
            <span onClick={() => toggleTask(t.id)}>{t.task}</span>
            <button onClick={() => editTask(t.id)}>✏️</button>
            <button onClick={() => deleteTask(t.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
