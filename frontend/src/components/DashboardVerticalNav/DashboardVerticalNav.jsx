import "./DashboardVerticalNav.css";
import { useNavigate } from "react-router-dom";

export default function DashboardVerticalNav() {
  const navigate = useNavigate();

  return (
    <aside className="v-navbar">

      {/* TOP SECTION */}
      <div className="v-top">
        <button className="v-new-project-btn" >
          <i className="fa-solid fa-plus"></i>
          <span>Create Project</span>
        </button>
      </div>

      {/* NAV ITEMS */}
      <ul className="v-menu">
        <li onClick={() => navigate("/dashboard")}>
          <i className="fa-solid fa-table-columns"></i>
          <span>Overview</span>
        </li>
        <li>
          <i className="fa-solid fa-diagram-project"></i>
          <span>My Projects</span>
        </li>
        <li>
          <i className="fa-solid fa-users"></i>
          <span>Team</span>
        </li>
        <li>
          <i className="fa-solid fa-clock-rotate-left"></i>
          <span onClick={() => navigate("/assigned-projects")}>Assigned Projects</span>
        </li>
        <li>
          <i className="fa-solid fa-comments"></i>
          <span>Messages</span>
        </li>
      </ul>

      {/* BOTTOM */}
      <div className="v-bottom">
        <div className="v-small-text">© 2025 • PlanStack</div>
      </div>

    </aside>
  );
}
