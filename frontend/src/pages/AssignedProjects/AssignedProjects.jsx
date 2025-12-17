import "./AssignedProjects.css";
import { useEffect, useState } from "react";
import { assignedProjects } from "../../api/services/projectServices";
import { useNavigate } from "react-router-dom";

export default function AssignedProjects() {
  const [projects, setProjects] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  const fetchAssignedProjects = async () => {
    try {
      const res = await assignedProjects();

      setProjects(res.data.projects);
      setCount(res.data.count);
    } catch (err) {
      console.error(
        "Error fetching assigned projects:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignedProjects();
  }, []);

  if (loading) {
    return (
      <div className="assignedProjects-container">
        <div className="assignedProjects-content">
          <p>Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="assignedProjects-container">
      <div className="assignedProjects-content">
        <h2 className="assignedProjects-title">
          Projects you’re working on ({count})
        </h2>

        {projects.length === 0 ? (
          <p className="assignedProjects-empty">
            You are not assigned to any projects yet.
          </p>
        ) : (
          <div className="assignedProjects-row">
            {projects.map((p) => (
              <div key={p._id} className="assignedProjects-card" onClick={() => navigate(`/assigned-projects/${p._id}`)}>
                <i className="fa-solid fa-diagram-project"></i>

                <div className="assignedProjects-info">
                  <h3>{p.name}</h3>
                  <p>{p.description || "No description provided."}</p>
                </div>

                <span className={`assignedProjects-status ${p.status}`}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
