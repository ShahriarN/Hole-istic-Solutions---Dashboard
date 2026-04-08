import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div>
        <h2 className="sidebar-title">Hole-istic Solutions</h2>

        <nav className="sidebar-nav">
          <NavLink to="/" className="sidebar-link">
            Overview
          </NavLink>

          <NavLink to="/reports" className="sidebar-link">
            Reports & Map
          </NavLink>

          <NavLink to="/analytics" className="sidebar-link">
            Analytics
          </NavLink>

          <NavLink to="/track" className="sidebar-link">
            Track a Report (View as an End User)
          </NavLink>

        </nav>
      </div>
    </div>
  );
}

export default Sidebar;