import {
  FaChartLine,
  FaBriefcase,
  FaBookmark,
  FaNewspaper,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

import "../../styles/sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("selectedStock");
    navigate("/login");
  };

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          📈
        </div>

        <div>
          <h2>StockPulse</h2>
          <span>AI Intelligence</span>
        </div>
      </div>

      <ul>

        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "sidebar-item active"
                : "sidebar-item"
            }
          >
            <FaChartLine />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/market"
            className={({ isActive }) =>
              isActive
                ? "sidebar-item active"
                : "sidebar-item"
            }
          >
            <FaChartLine />
            <span>Market</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/portfolio"
            className={({ isActive }) =>
              isActive
                ? "sidebar-item active"
                : "sidebar-item"
            }
          >
            <FaBriefcase />
            <span>Portfolio</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              isActive
                ? "sidebar-item active"
                : "sidebar-item"
            }
          >
            <FaBookmark />
            <span>Watchlist</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/news"
            className={({ isActive }) =>
              isActive
                ? "sidebar-item active"
                : "sidebar-item"
            }
          >
            <FaNewspaper />
            <span>News</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? "sidebar-item active"
                : "sidebar-item"
            }
          >
            <FaCog />
            <span>Settings</span>
          </NavLink>
        </li>

      </ul>

      <button
        className="logout"
        onClick={logout}
      >
        <FaSignOutAlt />

        <span>Logout</span>
      </button>

    </aside>
  );
}

export default Sidebar;