import { FaBell, FaUserCircle, FaSearch } from "react-icons/fa";
import "../../styles/navbar.css";

function Navbar() {
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
            const user = JSON.parse(localStorage.getItem("user"));

            <p>{user.name}</p>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;