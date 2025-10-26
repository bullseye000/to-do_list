const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // ✅ Enables JSON body parsing

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sample"
});

// Root route
app.get('/', (req, res) => {
  res.json("Hello, From Backend");
});

// 🧑‍🎓 Student Data
app.get('/student', (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// 💸 Expense Tracker Routes
app.get('/expenses', (req, res) => {
  db.query("SELECT * FROM expenses", (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

app.post('/expenses', (req, res) => {
  const { name, amount } = req.body;
  db.query("INSERT INTO expenses (name, amount) VALUES (?, ?)", [name, amount], (err) => {
    if (err) return res.status(500).json(err);
    return res.sendStatus(200);
  });
});

app.put('/expenses/:id', (req, res) => {
  const { id } = req.params;
  const { name, amount } = req.body;
  db.query("UPDATE expenses SET name = ?, amount = ? WHERE id = ?", [name, amount, id], (err) => {
    if (err) return res.status(500).json(err);
    return res.sendStatus(200);
  });
});

app.delete('/expenses/:id', (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM expenses WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    return res.sendStatus(200);
  });
});

// ✅ To-Do List Routes
app.get('/todos', (req, res) => {
  db.query("SELECT * FROM todos", (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

app.post('/todos', (req, res) => {
  const { task } = req.body;
  db.query("INSERT INTO todos (task) VALUES (?)", [task], (err) => {
    if (err) return res.status(500).json(err);
    return res.sendStatus(200);
  });
});

app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  db.query("UPDATE todos SET done = NOT done WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    return res.sendStatus(200);
  });
});

app.put('/todos/edit/:id', (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  db.query("UPDATE todos SET task = ? WHERE id = ?", [task, id], (err) => {
    if (err) return res.status(500).json(err);
    return res.sendStatus(200);
  });
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM todos WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    return res.sendStatus(200);
  });
});

// Start server
app.listen(8081, () => {
  console.log("Server running on http://localhost:8081");
});
