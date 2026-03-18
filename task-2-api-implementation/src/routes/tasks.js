const express = require('express');
const taskService = require('../services/taskService');

const router = express.Router();

// POST /tasks - create a new task
router.post('/', (req, res, next) => {
  try {
    const task = taskService.createTask(req.userId, req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

// GET /tasks - list all tasks
router.get('/', (req, res, next) => {
  try {
    const tasks = taskService.getAllTasks();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

// GET /tasks/:id - get a single task
router.get('/:id', (req, res, next) => {
  try {
    const task = taskService.getTaskById(Number(req.params.id));
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// PATCH /tasks/:id - update title/priority/assignedTo (assigner only)
router.patch('/:id', (req, res, next) => {
  try {
    const updated = taskService.updateTaskDetails(req.userId, Number(req.params.id), req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// PATCH /tasks/:id/status - assignee updates status
router.patch('/:id/status', (req, res, next) => {
  try {
    const { status } = req.body;
    const updated = taskService.updateTaskStatus(req.userId, Number(req.params.id), status);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// PATCH /tasks/:id/unassign - assigner removes assignee
router.patch('/:id/unassign', (req, res, next) => {
  try {
    const updated = taskService.unassignTask(req.userId, Number(req.params.id));
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /tasks/:id - assigner deletes task
router.delete('/:id', (req, res, next) => {
  try {
    taskService.deleteTask(req.userId, Number(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
