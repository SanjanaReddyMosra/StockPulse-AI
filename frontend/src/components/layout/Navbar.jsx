import { FaBell, FaUserCircle, FaSearch } from "react-icons/fa";
import "../../styles/navbar.css";

function Navbar() {
  let user = null;

  try {
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Invalid user data:", error);
    localStorage.removeItem("user");
  }

  return (
    <header className="navbar">
      <div className="logo">

        <div className="logo-icon">
          📈
        </div>

        <div className="logo-text">
          <h2>StockPulse</h2>
          <span>AI Intelligence</span>
        </div>

      </div>

      <div className="search">

        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search stocks, ETFs, Mutual Funds..."
        />

      </div>

      <div className="navbar-right">

        <div className="notification">

          <FaBell className="nav-icon" />

          <span className="notification-dot"></span>

        </div>

        <div className="user-info">

          <FaUserCircle className="user-avatar" />

          <div>

            <h4>Welcome</h4>

            <p>{user?.name || "Guest"}</p>

          </div>

        </div>

      </div>
    </header>
  );
}

export default Navbar;