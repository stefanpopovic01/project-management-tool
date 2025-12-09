import { React, useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import './Profile.css'
import { getUser } from '../../api/services/userServices';
import { AuthContext } from '../../contex/AuthContext';
import EditProfile from '../../components/EditProfile/EditProfile';
import defaultLogo from "../../assets/defaultUser.png"


function Profile() {

const { id } = useParams();
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [showEdit, setShowEdit] = useState(false);
const { user: loggedInUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await getUser(id); 
        setUser(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]); // pokreće se kad se id promeni

  const testUser = {
    projectsCreated: ["Project Manager App", "Task Tracker", "Chat Platform"],
    projectsContributed: ["CRM Dashboard", "Inventory System"]
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;
  const isOwner = loggedInUser?.id === id;

  return (
    <div className='profile-wrap'>
    <div className="profile-container">
      {/* LEFT PANEL */}
      <div className="profile-card">
        <img className="avatar" src={user.avatar || defaultLogo} alt="avatar" />

        <h2 className="profile-name">{user.name || "PlanStack User"}</h2>
        <p className="profile-position">{user.position || "PlanStack lover.."}</p>

        <div className="profile-info">
          <p>
            <i class="fa-solid fa-user"></i>
            {`@${user.username}`}
          </p>
          <p>
            <i className="fa-solid fa-envelope"></i>
            {user.email}
          </p>
          <p>
                <i className="fa-solid fa-location-dot"></i>
                {user.location || "PlanStack planet.."}
          </p>
          
        </div>

        <p className="profile-desc">{user.description || "I am using PlanStack.."}</p>

        <button className="edit-btn" onClick={() => setShowEdit(true)}>
          <i className="fa-solid fa-pen"></i> {isOwner ? "Edit profile" : "Invite"}
        </button>
      </div>

      {/* RIGHT PANEL */}
      <div className="profile-projects">
        <h3><i className="fa-solid fa-folder-open"></i> Projects Created</h3>
        <ul>
          {testUser.projectsCreated.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>

        <h3><i className="fa-solid fa-diagram-project"></i> Projects Contributed</h3>
        <ul>
          {testUser.projectsContributed.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>
    </div>
          
      {showEdit && (
        <EditProfile user={loggedInUser} onClose={() => setShowEdit(false)} />
      )}
    </div>
  )
}

export default Profile;
