const TaskModel = require('../models/taskModel');

function validateCreatePayload(payload) {
  if (!payload.title || typeof payload.title !== 'string') {
    const err = new Error('Missing or invalid title');
    err.status = 400;
    throw err;
  }
  if (!['low', 'medium', 'high'].includes(payload.priority)) {
    const err = new Error('Invalid priority');
    err.status = 400;
    throw err;
  }
  if (typeof payload.assignedTo !== 'number' || typeof payload.assignedBy !== 'number') {
    const err = new Error('assignedTo and assignedBy must be numbers');
    err.status = 400;
    throw err;
  }
}

function createTask(reqUserId, payload) {
  if (payload.assignedBy !== reqUserId) {
    const err = new Error('Only assigner (assignedBy) can create task');
    err.status = 403;
    throw err;
  }
  validateCreatePayload(payload);
  return TaskModel.create(payload);
}

function getAllTasks() {
  return TaskModel.findAll();
}

function getTaskById(id) {
  const task = TaskModel.findById(id);
  if (!task) {
    const err = new Error('Task not found');
    err.status = 404;
    throw err;
  }
  return task;
}

function updateTaskDetails(reqUserId, id, payload) {
  const task = TaskModel.findById(id);
  if (!task) {
    const err = new Error('Task not found');
    err.status = 404;
    throw err;
  }
  if (task.assignedBy !== reqUserId) {
    const err = new Error('Only assigner can update task details');
    err.status = 403;
    throw err;
  }
  const updates = {};
  if (payload.title !== undefined) {
    if (typeof payload.title !== 'string') {
      const err = new Error('Invalid title');
      err.status = 400;
      throw err;
    }
    updates.title = payload.title;
  }
  if (payload.priority !== undefined) {
    if (!['low', 'medium', 'high'].includes(payload.priority)) {
      const err = new Error('Invalid priority');
      err.status = 400;
      throw err;
    }
    updates.priority = payload.priority;
  }
  if (payload.assignedTo !== undefined) {
    if (typeof payload.assignedTo !== 'number') {
      const err = new Error('Invalid assignedTo');
      err.status = 400;
      throw err;
    }
    updates.assignedTo = payload.assignedTo;
  }
  if (payload.assignedBy !== undefined) {
    const err = new Error('Cannot change assignedBy');
    err.status = 400;
    throw err;
  }
  return TaskModel.update(id, updates);
}

function updateTaskStatus(reqUserId, id, status) {
  const task = TaskModel.findById(id);
  if (!task) {
    const err = new Error('Task not found');
    err.status = 404;
    throw err;
  }
  if (task.assignedTo !== reqUserId) {
    const err = new Error('Only assignee can update status');
    err.status = 403;
    throw err;
  }
  if (!['pending', 'in-progress', 'completed'].includes(status)) {
    const err = new Error('Invalid status');
    err.status = 400;
    throw err;
  }
  return TaskModel.update(id, { status });
}

function unassignTask(reqUserId, id) {
  const task = TaskModel.findById(id);
  if (!task) {
    const err = new Error('Task not found');
    err.status = 404;
    throw err;
  }
  if (task.assignedBy !== reqUserId) {
    const err = new Error('Only assigner can unassign');
    err.status = 403;
    throw err;
  }
  return TaskModel.update(id, { assignedTo: null });
}

function deleteTask(reqUserId, id) {
  const task = TaskModel.findById(id);
  if (!task) {
    const err = new Error('Task not found');
    err.status = 404;
    throw err;
  }
  if (task.assignedBy !== reqUserId) {
    const err = new Error('Only assigner can delete task');
    err.status = 403;
    throw err;
  }
  TaskModel.delete(id);
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskDetails,
  updateTaskStatus,
  unassignTask,
  deleteTask,
};
