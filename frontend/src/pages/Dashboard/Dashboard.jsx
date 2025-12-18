import "./Dashboard.css";
import { getProjects } from "../../api/services/projectServices";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

    const [projects, setProjects] = useState([]);
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

    const getProjects1 = async () => {
      try {
        const res = await getProjects();

        setProjects(res.data.projects);
        setCount(res.data.count);

      } catch (err) {
        console.error("Error while fetching projects:", err.response ? err.response.data : err.message);
      }
    };
    
  useEffect(() => {
    getProjects1();
  }, []);

  return (
    <div className='dashboard-containter'>
      <div className='dashboard-content'>
        
        <h2 className="dash-title">Recent Projects ({count})</h2>

        <div className="dash-projects-row">
          {projects.map((p) => (
            <div key={p._id} className="dash-project-card" onClick={() => navigate(`/my-assigned-project/${p._id}`)}>
              <i className="fa-solid fa-diagram-project"></i>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
            </div>
          ))}
          {projects.length < 1 && <p className="dashboard-createP-message">Create project to get started..</p>}
        </div>

        <div className="dash-footer-logo">
          <img 
            src="https://jira-frontend-bifrost.prod-east.frontend.public.atl-paas.net/assets/migration-logo.25f5c840.svg" 
            alt="logo" 
          />
        </div>

      </div>
    </div>
  )
}
