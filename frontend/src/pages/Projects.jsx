import { useState } from "react";
import API from "../api";

function Projects() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const createProject = async (e) => {
    e.preventDefault();

    console.log("Create Project clicked");

    setMessage("");
    setError("");

    try {
      const response = await API.post("/projects/", {
        name: name,
        description: description,
      });

      console.log("Project created:", response.data);

      setMessage("Project created successfully!");

      setName("");
      setDescription("");

    } catch (error) {
      console.error("Project creation error:", error);

      setError(
        error.response?.data
          ? JSON.stringify(error.response.data)
          : error.message
      );
    }
  };

  return (
    <div className="page">

      <h1>Projects</h1>

      <form onSubmit={createProject}>

        <div>
          <label>Project Name</label>

          <input
            type="text"
            placeholder="Enter project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Project Description</label>

          <textarea
            placeholder="Enter project description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">
          Create Project
        </button>

      </form>

      {message && (
        <p className="success">
          {message}
        </p>
      )}

      {error && (
        <p className="error">
          {error}
        </p>
      )}

    </div>
  );
}

export default Projects;