import { React, useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import './Profile.css'
import { getUser } from '../../api/services/userServices';
import { AuthContext } from '../../contex/AuthContext';
import EditProfile from '../../components/EditProfile/EditProfile';
import defaultLogo from "../../assets/defaultUser.png"
import InviteToProject from '../../components/InviteToProject/InviteToProject';
import { getProjects } from '../../api/services/projectServices';
import { assignedProjects } from '../../api/services/projectServices';
import { fetchUserProjects } from '../../api/services/projectServices';
import { fetchAssignedProjects } from '../../api/services/projectServices';

function Profile() {

const { id } = useParams();
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [showEdit, setShowEdit] = useState(false);
const { user: loggedInUser } = useContext(AuthContext);
const [showInvite, setShowInvite] = useState(false);
const [projects, setProjects] = useState([]);
const [count, setCount] = useState(0);
const [assignedProjects1, setAssignedProjects] = useState([]);
const [assignedCount, setAssignedCount] = useState(0);


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

    const getProjects1 = async () => {
      try {
        const res = await fetchUserProjects(id);

        setProjects(res.data.projects);
        setCount(res.data.count);

      } catch (err) {
        console.error("Error while fetching projects:", err.response ? err.response.data : err.message);
      }
    };

  const fetchAssignedProjects1 = async () => {
    try {
      const res = await fetchAssignedProjects(id);

      setAssignedProjects(res.data.projects);
      setAssignedCount(res.data.count);
    } catch (err) {
      console.error(
        "Error fetching assigned projects:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };


    fetchUser();
    getProjects1();
    fetchAssignedProjects1();
  }, [id]);

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

        <button className="edit-btn" onClick={isOwner ? () => setShowEdit(true) : () => setShowInvite(true)}>
          <i className="fa-solid fa-pen"></i> {isOwner ? "Edit profile" : "Invite"}
        </button>
      </div>

      {/* RIGHT PANEL */}
      <div className="profile-projects">
        <h3><i className="fa-solid fa-folder-open"></i> Projects Created</h3>
        <ul>
          {projects.map((p, i) => (
            <li key={i}>{p.name}</li>
          ))}
          {count < 1 && <p>Zero projects created.</p>}
        </ul>

        <h3><i className="fa-solid fa-diagram-project"></i> Projects Contributed</h3>
        <ul>
          {assignedProjects1.map((p, i) => (
            <li key={i}>{p.name}</li>
          ))}
          {assignedCount < 1 && <p>Zero projects assigned.</p>}
        </ul>
      </div>
    </div>
          
      {showEdit && (
        <EditProfile user={loggedInUser} onClose={() => setShowEdit(false)} />
      )}

      {showInvite && (
        <InviteToProject onClose={() => setShowInvite(false)} userId={id}/>
      )}
    </div>
  )
}

export default Profile;
