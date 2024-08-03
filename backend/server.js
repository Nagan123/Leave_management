const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Update with your password
  database: 'student'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected');
});

const secret = process.env.JWT_SECRET || 'your_jwt_secret'; // Use environment variable

// Register route
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  
  // Input validation (simplified example)
  if (!username || !email || !password) {
    return res.status(400).send('All fields are required');
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkEmailQuery, [email], (err, result) => {
    if (err) return res.status(500).send('Server error');
    if (result.length > 0) return res.status(409).send('Email already registered');

    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, hashedPassword], (err) => {
      if (err) return res.status(500).send('Server error');
      res.status(201).send('User registered');
    });
  });
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Input validation
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length === 0) return res.status(404).send('User not found');

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) return res.status(401).send('Invalid password');

    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).send({ auth: true, token, user });
  });
});






// Create - Add a new leave detail
app.post('/leave_details', (req, res) => {
  const { e_no, student_name, className, section, reason, leave_date, status } = req.body;

  // Input validation
  if (!e_no || !student_name || !className || !section || !reason || !leave_date || !status) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = 'INSERT INTO leave_details (e_no, student_name, class, section, reason, leave_date, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [e_no, student_name, className, section, reason, leave_date, status], (err) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    res.status(201).json({ message: 'Leave detail added' });
  });
});


// Read - Get all leave details
app.get('/leave_details', (req, res) => {
  const sql = 'SELECT * FROM leave_details';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send('Server error');
    res.status(200).json(results);
  });
});




// Read - Get a specific leave detail by ID
app.get('/leave_details/:id', (req, res) => {
  const { id } = req.params;
  
  console.log(`Fetching leave details for ID: ${id}`); // Debug logging

  if (!id) return res.status(400).send('ID is required');

  const sql = 'SELECT * FROM leave_details WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err); // Debug logging
      return res.status(500).send('Server error');
    }
    if (result.length === 0) return res.status(404).send('Leave detail not found');
    res.status(200).json(result[0]);
  });
});


// Update - Update a leave detail
app.put('/leave_details/:id', (req, res) => {
  const { id } = req.params;
  const { e_no, student_name, class: className, section, reason, leave_date, status } = req.body;

  // Input validation
  if (!id || !e_no || !student_name || !className || !section || !reason || !leave_date || !status) {
    return res.status(400).send('All fields are required');
  }

  const sql = 'UPDATE leave_details SET e_no = ?, student_name = ?, class = ?, section = ?, reason = ?, leave_date = ?, status = ? WHERE id = ?';
  db.query(sql, [e_no, student_name, className, section, reason, leave_date, status, id], (err) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Server error');
    }
    res.status(200).send('Leave detail updated');
  });
});


// Delete - Delete a leave detail
app.delete('/leave_details/:id', (req, res) => {
  const { id } = req.params;

  // Input validation
  if (!id) return res.status(400).send('ID is required');

  const sql = 'DELETE FROM leave_details WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).send('Server error');
    res.status(200).send('Leave detail deleted');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
