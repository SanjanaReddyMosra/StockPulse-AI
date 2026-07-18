import {
  FaChartLine,
  FaBriefcase,
  FaBookmark,
  FaNewspaper,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import "../../styles/sidebar.css";

function Sidebar() {
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

        <li className="sidebar-item active">
          <FaChartLine />
          <span>Dashboard</span>
        </li>

        <li className="sidebar-item">
          <FaChartLine />
          <span>Market</span>
        </li>

        <li className="sidebar-item">
          <FaBriefcase />
          <span>Portfolio</span>
        </li>

        <li className="sidebar-item">
          <FaBookmark />
          <span>Watchlist</span>
        </li>

        <li className="sidebar-item">
          <FaNewspaper />
          <span>News</span>
        </li>

        <li className="sidebar-item">
          <FaCog />
          <span>Settings</span>
        </li>

      </ul>

      <div className="logout">

        <FaSignOutAlt />

        <span>Logout</span>

      </div>

    </aside>
  );
}

export default Sidebar;