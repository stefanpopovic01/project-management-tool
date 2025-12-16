import "./DashboardHorizontalNav.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contex/AuthContext";
import { getUsers } from "../../api/services/userServices";
import { getInvites, respondToInvite } from "../../api/services/projectServices";
import logo from "../../assets/defaultUser.png";

export default function DashboardHorizontalNav( { showCreateProject, setShowCreateProject }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [avatarDropdown, setAvatarDropdown] = useState(false);
  const [notifcationDropdown, setNotificationDropdown] = useState(false);
  const [error, setError] = useState("");


  const { user, token, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  }

  const handleProfile = () => {
    navigate(`/profile/${user.id}`)
    setAvatarDropdown(!avatarDropdown);
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const res = await getUsers(searchQuery);
      setSearchResults(res.data.users);
      setError("");

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong..");
    }

  };

  const handleSelectUser = (user) => {
    console.log("Selected user:", user);
    setSearchResults([]);
    setSearchQuery("");
    navigate(`/profile/${user._id}`)
  };

  const [invites, setInvites] = useState([]);
  const [count, setCount] = useState(0);

  const fetchInvites = async () => {
    try {
      const res = await getInvites();

      setInvites(res.data.projects);
      setCount(res.data.count);
      setNotificationDropdown(!notifcationDropdown);

    } catch (err) {
      console.error("Error while getting invites", err);
    }
  };

  const inviteRespond = async (projectId, accept) => {
    try {
      const res = await respondToInvite({ projectId, accept });
      setNotificationDropdown(!notifcationDropdown);

    } catch (err) {
      console.error("Error while responding to invite ", err);
    }
  }


  return (
    <nav className="h-navbar">
      {/* LEFT SECTION */}
      <div className="h-navbar-left">
        <i className="h-nav-icon fa-solid fa-layer-group"></i>
        <img src="/src/assets/logo.png" alt="Logo" className="h-nav-logo" onClick={() => navigate("/dashboard")}/>
        <span className="h-nav-site-name" onClick={() => navigate("/dashboard")}>PlanStack</span>
      </div>

      {/* MID SECTION */}
      <div className="h-navbar-center">
        <form onSubmit={handleSearch} className="h-search-form">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <button className="h-create-btn" onClick={() => setShowCreateProject(!showCreateProject)}>Create Project</button>

        {/* SEARCH DROPDOWN */}
        {searchResults.length > 0 && (
          <div className="h-search-dropdown">
            {searchResults.map((user) => (
              <div
                key={user.id}
                className="h-search-item"
                onClick={() => handleSelectUser(user)}
              >
                <img src={user.avatar || logo} alt={user.name} />
                <span className="h-search-username">{user.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT SECTION */}
      <div className="h-navbar-right">
        <i className="h-nav-icon fa-solid fa-circle-question"></i>
        <i className="h-nav-icon fa-solid fa-bell" onClick={() => fetchInvites()}></i>
        <i className="h-nav-icon fa-solid fa-gear notifcation-icon"></i>

      {notifcationDropdown &&
        <div className="notification-containter">
          {invites.map((p) => (
              <div className="notification" key={p._id}>
                  <p>{p.name}</p>
                  <i class="fa fa-check notification-check" aria-hidden="true" onClick={() => inviteRespond(p._id, true)}></i>
                  <i class="fa-solid fa-x notification-decline"></i>
              </div>
          ))}
        </div>
      }



        <div className="h-avatar-container">
          <img src={user.avatar || logo} alt="User Avatar" className="h-nav-avatar" onClick={() => setAvatarDropdown(!avatarDropdown)}/>
          {avatarDropdown && (
            <div className="h-avatar-dropdown">
              <div className="h-avatar-item" onClick={() => handleProfile()}>
                <i className="fa-solid fa-user"></i> Profile
              </div>
              <div className="h-avatar-item">
                <i className="fa-solid fa-palette"></i> Theme
              </div>
              <div className="h-avatar-item">
                <i className="fa-solid fa-user-plus"></i> Switch Account
              </div>
              <div className="h-avatar-item">
                <i className="fa-solid fa-gear"></i> Settings
              </div>
              <div className="h-avatar-item" onClick={() => handleLogout()}>
                <i className="fa-solid fa-right-from-bracket"></i> Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
