### How I approached the Implementation

* Created the standard Node‑Express project layout under backend‑gt‑assessment/src.

* Implemented each layer one‑by‑one:

  - `index.js`:  bootstraps Express, adds JSON parsing, plugs in the auth middleware, mounts the /tasks router and provides a generic error‑handler.               
  - `middleware/auth.js` reads the x‑user‑id header, validates it, and stores the numeric ID on req.userId. 401 errors are thrown when the header is missing or
  malformed.
  - `models/taskModel.js` is an in‑memory Map that holds task objects, auto‑increments IDs, and supplies simple CRUD helpers. This matches the “simple in‑memory    
  store” requirement of the assessment.
  - `services/taskService.js`: contains all business rules: payload validation, the assigner/assignee authorization checks, status validation, and the CRUD       
  operations that delegate to the model. Every rule throws an Error with an appropriate status code (400/401/403/404).
  - `routes/tasks.js` defines the Express router and maps each HTTP verb/URL to the corresponding service function. Errors are passed to the central
  error‑handler via next(err).

  Also added a minimal package.json with express and nodemon (dev dependency) and a .gitignore for node_modules.

  All files are small, focused, and only use the core Node/Express APIs.



  ### Why I structured the code that way

  Entry Point `index.js`: Keeps server configuration (middleware, router mounting, error handling) in one place, making it easy to add global middleware later.

  Middleware `auth.js`: Isolates authentication logic so every route automatically gets req.userId without repeating code. It also centralises the 401 handling.

  Model `taskModel.js`: A tiny data‑access layer abstracts the raw Map. If a real DB is added later, only this file needs to change; the service layer stays as it is.

  Service `taskService.js`: Encapsulates business rules (validation, authorization). This separation means the router stays small (just request/response) and the real logic can be unit tested independently also. 

  Router `tasks.js` : Maps HTTP verbs to service calls, handling request parsing and response formatting. The router is the only place that knows the HTTP shape of the API; the service works with plain objects.


  ### Assumptions made

* Only the three roles defined in the README exist: assigner (assignedBy), assignee (assignedTo), and everyone else (403 on protected actions).
* The API runs on a single instance as the scaling discussion was my idea. Therefore, the “single‑process, single‑memory” implementation is sufficient for now.


 ### Assumptions made
* Deployment method: Entire deployment of the API could have been on the cloud, leveraging either AWS or Microsoft Azure.

* Database: Replace the in‑memory Map with a real database (DynamoDB). This would give durability, scaling across multiple instances and enable read-replica.
* Dockerization: Write a Dockerfile and a docker-compose.yml for reproducible local development and easy deployment to cloud platforms.

*  CI/CD pipeline: Set up GitHub Actions to run linting (if later added), tests, and automatically build/push a container image and deployment to clouder server or kubernetes pod.

