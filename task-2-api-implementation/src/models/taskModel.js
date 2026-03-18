class TaskModel {
  constructor() {
    this.tasks = new Map();
    this.nextId = 1;
  }

  create(data) {
    const id = this.nextId++;
    const task = {
      id,
      title: data.title,
      priority: data.priority,
      status: 'pending',
      assignedTo: data.assignedTo,
      assignedBy: data.assignedBy,
      createdAt: new Date().toISOString(),
    };
    this.tasks.set(id, task);
    return task;
  }

  findAll() {
    return Array.from(this.tasks.values());
  }

  findById(id) {
    return this.tasks.get(id);
  }

  update(id, updates) {
    const task = this.tasks.get(id);
    if (!task) return null;
    Object.assign(task, updates);
    this.tasks.set(id, task);
    return task;
  }

  delete(id) {
    return this.tasks.delete(id);
  }
}

module.exports = new TaskModel();
