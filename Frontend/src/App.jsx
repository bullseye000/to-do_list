import React, { useEffect, useState } from "react";
import ExpenseTracker from "./components/ExpenseTracker";
import ToDoList from "./components/ToDoList";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8081/student")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  return (
    <div className={darkMode ? "container dark" : "container light"}>
      <h1>My Expense Tracker and To-Do List</h1>
      <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button>
      <div className="grid">
        
        <ExpenseTracker />
        <ToDoList />
      </div>
    </div>
  );
}

export default App;
