const express = require('express');
const authMiddleware = require('./middleware/auth');
const tasksRouter = require('./routes/tasks');

const app = express();
app.use(express.json());

// Authentication middleware extracts user ID from header
app.use(authMiddleware);

// Mount tasks router
app.use('/tasks', tasksRouter);

// Generic error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
