import "./InviteToProject.css";
import { useEffect, useState } from "react";
import { getProjects } from "../../api/services/projectServices";
import { inviteUser } from "../../api/services/projectServices";

export default function InviteToProject({ onClose, userId }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data.projects);
    } catch (err) {
      console.error("Error fetching projects", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const addUser = async (projectId) => {

    try {
        const res = await inviteUser({ projectId, userId });

        setSuccess(true);
        setError("");


    } catch (err) {
        setError(err.response?.data?.message || "Something went wrong...");
        setSuccess(false);
    }
  };

  return (
    <div className="invite-overlay" onClick={onClose}>
      <div className="invite-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Invite to Project</h2>
        <p>Select one of your projects</p>

        {loading ? (
          <p>Loading projects...</p>
        ) : (
          <div className="invite-project-list">
            {projects.map((p) => (
              <div key={p._id} className="invite-project-card">
                <i className="fa-solid fa-diagram-project"></i>
                <div>
                  <h4>{p.name}</h4>
                  <p>{p.description || "No description"}</p>
                </div>
                <button className="invite-btn" onClick={() => addUser(p._id)}>Invite</button>
              </div>
            ))}
          </div>
        )}

        {success && <p className="success-msg">Success!</p>}
        {error && <p className="error-msg">{error}</p>}

        <button className="invite-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
