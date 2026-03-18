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

  