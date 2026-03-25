import { useEffect, useRef, useState } from "react";

function Topbar({ searchTerm = "", setSearchTerm = () => {}, showSearch = false }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  const userName = "Admin User";

  const notifications = [
    "New pothole report submitted on Deerfoot Trail.",
    "Report #12 status updated to Resolved.",
    "Crew assigned to Report #19.",
  ];

  const unreadCount = notifications.length;

  const userInitials = userName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }

      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function toggleNotifications() {
    setShowNotifications((prev) => !prev);
    setShowProfileMenu(false);
  }

  function toggleProfileMenu() {
    setShowProfileMenu((prev) => !prev);
    setShowNotifications(false);
  }

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="topbar-title">Pothole Dashboard</div>

        {showSearch && (
          <div className="topbar-search">
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="topbar-right">
        <div className="topbar-dropdown-wrapper" ref={notificationsRef}>
          <button
            type="button"
            className="topbar-icon-button notification-button"
            onClick={toggleNotifications}
          >
            🔔
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>

          {showNotifications && (
            <div className="topbar-dropdown notifications-dropdown">
              <div className="dropdown-header">Notifications</div>

              {notifications.map((item, index) => (
                <div key={index} className="dropdown-item">
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="topbar-dropdown-wrapper" ref={profileRef}>
          <button
            type="button"
            className="profile-button"
            onClick={toggleProfileMenu}
          >
            <div className="profile-icon">{userInitials}</div>
            <span className="topbar-user">{userName}</span>
          </button>

          {showProfileMenu && (
            <div className="topbar-dropdown profile-dropdown">
              <div className="dropdown-header">Profile</div>
              <button type="button" className="dropdown-action">My Account</button>
              <button type="button" className="dropdown-action">Settings</button>
              <button type="button" className="dropdown-action">Sign Out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;