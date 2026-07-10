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

      <h2 className="sidebar-logo">
        StockPulse AI
      </h2>

      <ul>

        <li className="sidebar-item">
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