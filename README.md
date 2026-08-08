# Team Task Manager

A full-stack **Team Task Manager** application built with **Django REST Framework** and **React.js**. The application allows authenticated users to create and manage projects, create and track tasks, and organize team activities through a dashboard.

## 🚀 Features

### 🔐 Authentication

* User login and signup
* JWT-based authentication
* Protected API endpoints
* Role-based users such as Admin and Member
* Logout functionality

### 📁 Project Management

* Create projects
* View projects
* Add project descriptions
* Track project creators
* Manage project members
* View projects belonging to the logged-in user

### ✅ Task Management

* Create tasks
* Assign tasks to projects
* Set task descriptions
* Set task status
* Set due dates
* View tasks associated with user's projects

### 📊 Dashboard

The dashboard provides an overview of:

* Total Projects
* Total Tasks
* Completed Tasks
* Pending Tasks
* In Progress Tasks
* Team Members
* Recent Projects
* Recent Tasks
* Quick Actions

### 🎨 Frontend

* React.js
* React Router
* Axios
* Responsive user interface
* Structured navigation bar
* Login and signup pages
* Dashboard
* Projects page
* Tasks page

---

## 🛠️ Technologies Used

### Backend

* Python
* Django
* Django REST Framework
* JWT Authentication
* SQLite during development
* PostgreSQL for production deployment

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Axios
* React Router DOM
* Vite

### Tools

* Git
* GitHub
* VS Code
* Postman
* Railway

---

## 📂 Project Structure

```text
team-task-manager/
│
├── backend/
│   ├── accounts/
│   │   ├── migrations/
│   │   ├── admin.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   │
│   ├── projects/
│   │   ├── migrations/
│   │   ├── admin.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   │
│   ├── tasks/
│   │   ├── migrations/
│   │   ├── admin.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   │
│   ├── config/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   │
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Projects.jsx
│   │   │   └── Tasks.jsx
│   │   │
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## ⚙️ Backend Setup

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/team-task-manager.git
```

Move into the project:

```bash
cd team-task-manager/backend
```

Create a virtual environment:

### Windows

```bash
python -m venv venv
```

Activate it:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py migrate
```

Create a superuser:

```bash
python manage.py createsuperuser
```

Start Django:

```bash
python manage.py runserver
```

Backend will run at:

```text
http://127.0.0.1:8000/
```

---

## 💻 Frontend Setup

Open another terminal:

```bash
cd team-task-manager/frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173/
```

> Vite may use another port such as `5174` if port `5173` is already occupied.

---

## 🔗 API Endpoints

### Authentication

```text
POST /api/auth/signup/
POST /api/auth/login/
```

### Projects

```text
GET    /api/projects/
POST   /api/projects/
GET    /api/projects/{id}/
PUT    /api/projects/{id}/
PATCH  /api/projects/{id}/
DELETE /api/projects/{id}/
```

### Tasks

```text
GET    /api/tasks/
POST   /api/tasks/
GET    /api/tasks/{id}/
PUT    /api/tasks/{id}/
PATCH  /api/tasks/{id}/
DELETE /api/tasks/{id}/
```

---

## 🔑 Authentication

The application uses JWT authentication.

After successful login, the frontend stores the authentication tokens:

```javascript
localStorage.setItem("access", response.data.access);
localStorage.setItem("refresh", response.data.refresh);
```

Authenticated API requests use the access token.

---

## 🗃️ Database Models

### Project

A project contains:

* Name
* Description
* Created By
* Members
* Created Date
* Updated Date

### Task

A task contains:

* Title
* Description
* Project
* Assigned User
* Created By
* Status
* Due Date
* Created Date
* Updated Date

### Task Status

Tasks can have three statuses:

```text
TODO
IN_PROGRESS
COMPLETED
```

---

## 📊 Dashboard Example

```text
                 DASHBOARD

┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│      4      │ │      3      │ │      1      │
│  PROJECTS   │ │    TASKS    │ │  COMPLETED  │
└─────────────┘ └─────────────┘ └─────────────┘

┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│      1      │ │      1      │ │      2      │
│   PENDING   │ │ IN PROGRESS │ │TEAM MEMBERS │
└─────────────┘ └─────────────┘ └─────────────┘
```

---

## 🖥️ Application Pages

### Login

Users can log in using their username and password.

### Signup

New users can create an account.

### Dashboard

Provides an overview of projects, tasks, statuses, and team members.

### Projects

Users can create and view their projects.

### Tasks

Users can create and track tasks associated with their projects.

---

## 🔒 Security

* Authentication is required for protected API endpoints.
* JWT access tokens are used for API authentication.
* User-specific project and task data is protected through backend permissions.
* Sensitive files such as `.env` and the Python virtual environment should not be committed to GitHub.

---

## 🚀 Deployment

The application can be deployed using:

* **GitHub** — source code repository
* **Railway** — backend and database hosting
* **Railway/Vite-compatible hosting** — frontend hosting

Production deployment requires configuring:

```text
SECRET_KEY
DEBUG
ALLOWED_HOSTS
DATABASE_URL
CORS_ALLOWED_ORIGINS
```

---

## 🔮 Future Improvements

* Team member management
* Task assignment from the frontend
* Project member invitation
* Task editing and deletion
* Drag-and-drop task board
* Task filtering and searching
* Notifications
* User profile management
* PostgreSQL production database
* Improved role-based permissions
* Production deployment

---

## 👩‍💻 Author

**Rakshita Ramesh**

B.E. Artificial Intelligence and Machine Learning

Python Full Stack Developer

---

## 📄 License

This project is created for educational and portfolio purposes.

```
```
