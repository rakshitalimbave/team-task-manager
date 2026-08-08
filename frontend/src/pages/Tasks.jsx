
import { useEffect, useState } from "react";
import API from "../api";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState("");
  const [status, setStatus] = useState("TODO");
  const [dueDate, setDueDate] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadTasks();
    loadProjects();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await API.get("/tasks/");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
      setError("Could not load tasks.");
    }
  };

  const loadProjects = async () => {
    try {
      const response = await API.get("/projects/");
      setProjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    try {
      await API.post("/tasks/", {
        title,
        description,
        project,
        status,
        due_date: dueDate || null,
      });

      setMessage("Task created successfully!");

      setTitle("");
      setDescription("");
      setProject("");
      setStatus("TODO");
      setDueDate("");

      loadTasks();
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data
          ? JSON.stringify(error.response.data)
          : "Could not create task."
      );
    }
  };

  const getStatusClass = (status) => {
    if (status === "COMPLETED") return "status-completed";
    if (status === "IN_PROGRESS") return "status-progress";
    return "status-todo";
  };

  const getStatusText = (status) => {
    if (status === "COMPLETED") return "Completed";
    if (status === "IN_PROGRESS") return "In Progress";
    return "To Do";
  };

  return (
    <div className="tasks-page">

      <h1>Tasks</h1>

      {/* CREATE TASK */}
      <div className="task-form-card">

        <h2>Create New Task</h2>

        <form onSubmit={createTask}>

          <div className="form-group">
            <label>Title</label>

            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Project</label>

            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              required
            >
              <option value="">Select project</option>

              {projects.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          <div className="form-group">
            <label>Due Date</label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {message && (
            <p className="success-message">
              {message}
            </p>
          )}

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="create-task-button"
          >
            Create Task
          </button>

        </form>

      </div>


      {/* ALL TASKS */}
      <div className="tasks-list">

        <h2>All Tasks</h2>

        {tasks.length === 0 ? (
          <div className="empty-tasks">
            No tasks found.
          </div>
        ) : (
          tasks.map((task) => (

            <div
              className="task-card"
              key={task.id}
            >

              <div className="task-card-header">

                <h3>{task.title}</h3>

                <span
                  className={getStatusClass(task.status)}
                >
                  {getStatusText(task.status)}
                </span>

              </div>

              <p className="task-description">
                {task.description || "No description"}
              </p>

              <div className="task-details">

                <span>
                  <strong>Project:</strong>{" "}
                  {projects.find(
                    (p) => p.id === Number(task.project)
                  )?.name || `Project ${task.project}`}
                </span>

                <span>
                  <strong>Due:</strong>{" "}
                  {task.due_date || "No due date"}
                </span>

              </div>

            </div>

          ))
        )}

      </div>

    </div>
  );
}

export default Tasks;

