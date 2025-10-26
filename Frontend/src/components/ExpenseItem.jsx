import React from "react";

function ExpenseItem({ id, name, amount, onDelete, onEdit }) {
  return (
    <li>
      {name} - ₹{amount}
      <button onClick={() => onEdit(id)}>✏️</button>
      <button onClick={() => onDelete(id)}>🗑️</button>
    </li>
  );
}

export default ExpenseItem;
