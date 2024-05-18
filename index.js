const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Middleware for checking token
const checkAuth = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token || token !== 'Bearer exampleToken') {
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthorized'
    });
  }
  next();
};

app.post('/api/login', (req, res) => {
  // Logic for user login
  res.json({
    statusCode: 200,
    token: 'exampleToken',
    message: 'Login successful'
  });
});

app.post('/api/users', (req, res) => {
  // Logic for creating a new user
  res.json({
    statusCode: 201,
    data: { id: 'newUserId', email: req.body.email },
    message: 'User created successfully'
  });
});

app.delete('/api/users/:id', checkAuth, (req, res) => {
  // Logic for deleting a user
  res.json({
    statusCode: 200,
    data: null,
    message: 'User deleted successfully'
  });
});

app.get('/api/users/:id', checkAuth, (req, res) => {
  // Logic for getting a user by ID
  res.json({
    statusCode: 200,
    data: { id: req.params.id, email: 'user@example.com' },
    message: 'User fetched successfully'
  });
});

app.put('/api/users/:id', checkAuth, (req, res) => {
  // Logic for updating user information
  res.json({
    statusCode: 200,
    data: { id: req.params.id, ...req.body },
    message: 'User updated successfully'
  });
});

app.get('/api/validate', checkAuth, (req, res) => {
  // Logic for validating token
  res.json({
    statusCode: 200,
    data: null,
    message: 'Token is valid'
  });
});

app.get('/api/users/check/:email', (req, res) => {
  // Logic for checking user email
  res.json({
    statusCode: 200,
    data: { exists: false },
    message: 'Email check complete'
  });
});

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
