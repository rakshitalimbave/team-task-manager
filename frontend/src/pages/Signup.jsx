import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "MEMBER",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      await API.post("/auth/signup/", form);

      setSuccess("Account created successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      console.error(error);

      if (error.response?.data) {
        setError(
          typeof error.response.data === "string"
            ? error.response.data
            : JSON.stringify(error.response.data)
        );
      } else {
        setError("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>Team Task Manager</h1>

        <h2>Create Account</h2>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        {success && (
          <p className="success">
            {success}
          </p>
        )}

        <form onSubmit={handleSignup}>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="MEMBER">
              Member
            </option>

            <option value="ADMIN">
              Admin
            </option>
          </select>

          <button type="submit">
            Create Account
          </button>

        </form>

        <p>
          Already have an account?{" "}
          <Link to="/">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Signup;