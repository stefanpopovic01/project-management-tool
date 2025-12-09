import "./Dashboard.css";

export default function Dashboard() {

  // Hard-coded projekti
  const recentProjects = [
    { id: 1, name: "Marketing Website Redesign", description: "UI updates and new landing pages" },
    { id: 2, name: "Mobile App Sprint 12", description: "Bug fixes + new settings page" },
    { id: 3, name: "CRM Optimization", description: "Database cleanup and performance audit" },
    { id: 4, name: "Internal Tools Revamp", description: "Improved dashboard for support team" },
  ];

  return (
    <div className='dashboard-containter'>
      <div className='dashboard-content'>
        
        <h2 className="dash-title">Recent Projects</h2>

        <div className="dash-projects-row">
          {recentProjects.map((p) => (
            <div key={p.id} className="dash-project-card">
              <i className="fa-solid fa-diagram-project"></i>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
            </div>
          ))}
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
