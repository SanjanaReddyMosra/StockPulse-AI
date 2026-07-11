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
  console.error("Invalid user data in localStorage:", error);
  localStorage.removeItem("user");
}
  return (
    <header className="navbar">

      <div className="logo">
        StockPulse AI
      </div>

      <div className="search">

        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search stocks..."
        />

      </div>

      <div className="navbar-right">

        <FaBell className="nav-icon" />

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