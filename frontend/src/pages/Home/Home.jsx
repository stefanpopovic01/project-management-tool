import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">

      <div className="landing-shapes">
        <span className="shape one"></span>
        <span className="shape two"></span>
      </div>

      <div className="landing-content">

        <div className="landing-hero">
          <h1>
            Manage projects.<br />
            <span>Deliver results.</span>
          </h1>

          <p>
            A simple and powerful platform to create projects, assign tasks,
            collaborate with your team and track progress from planning to
            completion.
          </p>

          <div className="landing-actions">
            <button
              className="btn primary"
              onClick={() => navigate("/register")}
            >
              Get Started
            </button>

            <button
              className="btn secondary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>

        <div className="landing-features">
          <div className="feature-card">
            <i className="fa-solid fa-diagram-project"></i>
            <h3>Projects</h3>
            <p>Create, organize and manage projects with ease.</p>
          </div>

          <div className="feature-card">
            <i className="fa-solid fa-list-check"></i>
            <h3>Tasks</h3>
            <p>Assign tasks, track progress and stay in sync.</p>
          </div>

          <div className="feature-card">
            <i className="fa-solid fa-users"></i>
            <h3>Collaboration</h3>
            <p>Invite teammates and work together efficiently.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
