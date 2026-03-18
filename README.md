Backend API Implementation

## Development Commands

- **Install dependencies** – Node.js: `npm install`
- **Run the API locally** – Development (watch mode): `npm run dev` *(expects a script in `package.json` that starts the server with live‑reload, e.g., using `nodemon`)*
- **Build** – `npm run build`
- **Start production server** – `npm start`

## Architecture Overview

The API follows a clean separation of concerns:

1. **Entry Point** – `src/index.js` sets up the server and mounts the router.
2. **Router / Controllers** – `src/routes/tasks.js` maps endpoints to handlers.
3. **Service Layer** – `src/services/taskService.js` contains business logic, validation, and authorization.
4. **Data Store** – Simple in‑memory store or lightweight database abstraction (`src/models/taskModel.js`).
5. **Middleware** – `src/middleware/auth.js` extracts the authenticated user ID.
6. **Error Handling** – Central middleware formats errors with appropriate HTTP status codes.



## Objective

Build a simple **Task Management API**.

This task evaluates your ability to:

- Design APIs
- Structure backend code
- Handle errors
- Implement backend logic
- Apply basic authorization rules

---

## Requirements

Create a backend service that allows users to manage tasks and assign them to other users.

Each task should contain:

- id
- title
- priority
- status
- assignedTo (userId of the assignee)
- assignedBy (userId of the assigner)
- createdAt

### Status Values

A task can have the following statuses:

- pending
- in-progress
- completed

---

# Business Rules

1. A user can create a task and assign it to another user.
2. The **user who assigns the task (assigner)** is the only person allowed to:
   - update the task details
   - delete the task
   - unassign the task
3. The **assignee** is allowed to:
   - update the task status only

Example:

If User A assigns a task to User B:

- User A can edit, delete, or unassign the task
- User B can only update the task status

---

# Required Endpoints

### 1. Create Task

```
POST /tasks
```

Example request:

```json
{
  "title": "Complete assessment",
  "priority": "high",
  "assignedTo": 2,
  "assignedBy": 1
}
```

Example response:

```json
{
  "id": 1,
  "title": "Complete assessment",
  "priority": "high",
  "status": "pending",
  "assignedTo": 2,
  "assignedBy": 1,
  "createdAt": "2026-03-09T12:00:00Z"
}
```

---

### 2. Get All Tasks

```
GET /tasks
```

Return all tasks.

You may optionally support filtering by:

- assignedTo
- status

---

### 3. Update Task

```
PATCH /tasks/:id
```

Only the **assigner** can update task details such as:

- title
- priority

---

### 4. Update Task Status

```
PATCH /tasks/:id/status
```

Only the **assignee** can update the task status.

Example request:

```json
{
  "status": "in-progress"
}
```

---

### 5. Unassign Task

```
PATCH /tasks/:id/unassign
```

Only the **assigner** can unassign a task.

---

### 6. Delete Task

```
DELETE /tasks/:id
```

Only the **assigner** can delete a task.

---

# Implementation Guidelines

Make use of the stack below
- Node.js

You may use:

- In-memory storage
- Or a simple database

Your implementation should include:

- Input validation
- Proper HTTP status codes
- Basic authorization checks
- Clean code structure
- Proper error handling

---

# Assumptions

You may assume that the **userId of the currently authenticated user** is available in the request (for example through headers or middleware).

Example:

```
x-user-id: 1
```

You may use this to determine whether a user is the **assigner or assignee**.

---
# Running the Project

The project skeleton is now in place. To get the server running on your machine:

  1. Open a terminal and change to the project folder:

  `cd backend-gt-assessment`

  2. Install the dependencies (Express and nodemon) with npm:

  `npm install`

  3. Start the development server 

  `npm run dev`

  3. The server will listen on port 3000.
  
  4. Test a simple request (including the x-user-id header):

  curl -X POST http://localhost:3000/tasks \
       -H "Content-Type: application/json" \
       -H "x-user-id: 1" \
       -d '{"title":"First task","priority":"high","assignedTo":2,"assignedBy":1}'

  You should see a JSON response with the newly created task, including its id and createdAt timestamp.

  