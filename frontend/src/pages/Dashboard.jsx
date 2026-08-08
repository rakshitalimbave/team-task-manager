import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const projectsResponse = await API.get("/projects/");
      const tasksResponse = await API.get("/tasks/");

      setProjects(projectsResponse.data);
      setTasks(tasksResponse.data);

      // If you don't have a members API yet,
      // keep this as an empty array.
      setMembers([]);
    } catch (error) {
      console.error("Dashboard error:", error);
    }
  };

  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "TODO"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  ).length;

  return (
    <div className="dashboard">

      <h1>DASHBOARD</h1>

      {/* STATISTICS */}
      <div className="dashboard-grid">

        <div
          className="dashboard-card"
          onClick={() => navigate("/projects")}
        >
          <h2>{projects.length}</h2>
          <p>PROJECTS</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/tasks")}
        >
          <h2>{tasks.length}</h2>
          <p>TASKS</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/tasks?status=COMPLETED")}
        >
          <h2>{completedTasks}</h2>
          <p>COMPLETED</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/tasks?status=TODO")}
        >
          <h2>{pendingTasks}</h2>
          <p>PENDING</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/tasks?status=IN_PROGRESS")}
        >
          <h2>{inProgressTasks}</h2>
          <p>IN PROGRESS</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/team")}
        >
          <h2>{members.length}</h2>
          <p>TEAM MEMBERS</p>
        </div>

      </div>


      {/* QUICK ACTIONS */}
      <section className="dashboard-section">

        <h2>QUICK ACTIONS</h2>

        <div className="quick-actions">

          <button
            onClick={() => navigate("/projects")}
          >
            + Create Project
          </button>

          <button
            onClick={() => navigate("/tasks")}
          >
            + Create Task
          </button>

        </div>

      </section>


      {/* RECENT PROJECTS */}
      <section className="dashboard-section">

        <h2>RECENT PROJECTS</h2>

        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          projects.slice(0, 3).map((project) => (
            <div
              className="recent-item"
              key={project.id}
              onClick={() => navigate("/projects")}
            >
              <strong>{project.name}</strong>

              <p>
                {project.description}
              </p>
            </div>
          ))
        )}

      </section>


      {/* RECENT TASKS */}
      <section className="dashboard-section">

        <h2>RECENT TASKS</h2>

        {tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          tasks.slice(0, 3).map((task) => (
            <div
              className="recent-task"
              key={task.id}
              onClick={() => navigate("/tasks")}
            >
              <strong>{task.title}</strong>

              <span
                className={`status ${task.status.toLowerCase()}`}
              >
                {task.status}
              </span>
            </div>
          ))
        )}

      </section>

    </div>
  );
}

export default Dashboard;