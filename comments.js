// Create web server
// Create connection to database
// Create a table in the database
// Add a comment to the table
// Retrieve all comments from the table
// Retrieve a single comment from the table
// Update a comment in the table
// Delete a comment from the table

const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

// Create connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "comments",
});

// Connect to database
connection.connect((err) => {
  if (err) {
    console.log("Error connecting to database");
    return;
  }
  console.log("Connected to database");
});

// Create a table in the database
app.get("/create-table", (req, res) => {
  const sql = `CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    comment TEXT
  )`;

  connection.query(sql, (err, result) => {
    if (err) {
      res.send("Error creating table");
      return;
    }
    res.send("Table created");
  });
});

// Add a comment to the table
app.post("/comments", (req, res) => {
  const comment = req.body.comment;
  const sql = `INSERT INTO comments (comment) VALUES ('${comment}')`;

  connection.query(sql, (err, result) => {
    if (err) {
      res.send("Error adding comment");
      return;
    }
    res.send("Comment added");
  });
});

// Retrieve all comments from the table
app.get("/comments", (req, res) => {
  const sql = `SELECT * FROM comments`;

  connection.query(sql, (err, result) => {
    if (err) {
      res.send("Error retrieving comments");
      return;
    }
    res.send(result);
  });
});

// Retrieve a single comment from the table
app.get("/comments/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM comments WHERE id = ${id}`;

  connection.query(sql, (err, result) => {
    if (err) {
      res.send("Error retrieving comment");
      return;
    }
    res.send(result[0]);
  });
});

// Update a comment in the table