const express = require('express');
const mysql = require('mysql'); // Add MySQL module
const app = express();
const port = process.env.PORT || 3000;

// Create MySQL database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'yourUsername',
  password: 'yourPassword',
  database: 'wlra_db'
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
});

// Define the root route
app.get('/', (req, res) => {
  res.send('WLRA App Backend is Running!');
});

// Add the /schedule route to query the database
app.get('/schedule', (req, res) => {
  connection.query('SELECT * FROM schedules', (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('WLRA App Backend is Running!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
