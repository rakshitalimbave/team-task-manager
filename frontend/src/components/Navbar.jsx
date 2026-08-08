import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  };

  return (
    <nav className="navbar">

      <div className="navbar-container">

        {/* Logo */}
        <Link to="/dashboard" className="navbar-logo">
          Team Task Manager
        </Link>

        {/* Navigation */}
        <div className="navbar-links">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/projects">
            Projects
          </Link>

          <Link to="/tasks">
            Tasks
          </Link>

          <button
            className="logout-button"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;