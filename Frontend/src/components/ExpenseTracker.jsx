import React, { useState, useEffect } from "react";
import ExpenseItem from "./ExpenseItem";

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [input, setInput] = useState({ name: "", amount: "" });

  useEffect(() => {
    fetch("http://localhost:8081/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  }, []);

  const handleAdd = () => {
    if (!input.name || !input.amount) return;
    fetch("http://localhost:8081/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    }).then(() => {
      setExpenses([...expenses, input]);
      setInput({ name: "", amount: "" });
    });
  };

  const deleteExpense = (id) => {
    fetch(`http://localhost:8081/expenses/${id}`, { method: "DELETE" }).then(() => {
      setExpenses(expenses.filter((e) => e.id !== id));
    });
  };

  const editExpense = (id) => {
    const updated = prompt("Enter new name and amount (comma separated):");
    if (!updated) return;
    const [name, amount] = updated.split(",");
    fetch(`http://localhost:8081/expenses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, amount }),
    }).then(() => {
      setExpenses(
        expenses.map((e) => (e.id === id ? { ...e, name, amount } : e))
      );
    });
  };

  return (
    <div className="card">
      <h2>Expense Tracker</h2>
      <input
        type="text"
        placeholder="Expense name"
        value={input.name}
        onChange={(e) => setInput({ ...input, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Amount"
        value={input.amount}
        onChange={(e) => setInput({ ...input, amount: e.target.value })}
      />
      <button onClick={handleAdd}>Add Expense</button>
      <ul>
        {expenses.map((exp) => (
          <ExpenseItem
            key={exp.id}
            id={exp.id}
            name={exp.name}
            amount={exp.amount}
            onDelete={deleteExpense}
            onEdit={editExpense}
          />
        ))}
      </ul>
    </div>
  );
}

export default ExpenseTracker;
