# Task Manager Web App

> Task manager web app is a full-stack boilplate that built by express.js, mongoDB, and React.js. See the features below!

---

### Demo Site

https://jay-pan-task-manager.herokuapp.com/

---

### Features

**backend**

- Create mongoose model
- Data validation and sanitization
- Structure REST API (CRUD)
- Use Aysnc/ Await ES6 syntax handling asynchronous request
- User registration, login, logout etc.
- API authentication and security using JSON web token
- Send account activating Email by using Sendgrid
- Establish mongoose relationship between two mongoose schema
- Avatar file upload using multar with file validation, auto cropping

**frontend**

- React Router with private, public page authentication
- Responsive web design using antd UI framework
- Store web token caching in cookies
- Real world task(todo list) features using Redux, Redux-thunk updating task status
- Connect user and task REST API (CRUD)

### Upcoming features

**backend**

- API Sorting, filtering, pagination for tasks
- Test code using JEST framework

**frontend**

- Refactor fetching user code

---

### Quick Start

> Start node.js server

Create .dev.env file at /config directory and provide accordingly variable

```
API_ENDPOINT=localhost:3001
PORT=3001
SENDGRID_API_KEY=
JWT_SECRET=
MONGODB_URL_DEV=mongodb://127.0.0.1:27017/task-manager-api
MONGODB_URL=
CLIENT_URL_DEV=http://localhost:3000
```

```
npm install
npm run dev
```

> Start react development server

```
cd ./client
npm install
npm run start
```

Your site is now running at http://localhost:3000 !
