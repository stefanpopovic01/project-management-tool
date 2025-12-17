import "./ProjectBoard.css";
import { useParams } from "react-router-dom";
import { getProjectById } from "../../api/services/projectServices";
import { useState, useEffect } from "react";
import AddTaskDropdown from "../../components/AddTaskDropdown/AddTaskDropdown";
import { getEmployees } from "../../api/services/projectServices";

export default function ProjectBoard() {
  const { projectId } = useParams();
const [showAddTask, setShowAddTask] = useState(false);

const [employees, setEmployees] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");


  const [project, setProject] = useState("");

useEffect(() => {
  const fetchProject = async () => {
    try {
      const res = await getProjectById(projectId);
      setProject(res.data);
    } catch (err) {
      console.error("Error fetching project", err);
    }
  };

  fetchProject();
}, [projectId]);


const fetchEmployees = async (projectId) => {
  try {
    const res = await getEmployees(projectId);
    setEmployees(res.data.employees); 
  } catch (err) {
    console.error("Error fetching employees", err);
    setError("Failed to load employees");
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  if (!projectId) return;
  fetchEmployees(projectId);
}, [projectId]);


  return (
    <div className="projectBoard-container">
      {/* HEADER */}
      <div className="projectBoard-header">
        <div>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          <span className="projectBoard-deadline">
            Deadline: {project.deadline}
          </span>
        </div>

        <div className="projectBoard-actions">
          <button className="pb-btn secondary">Edit Project</button>
          <button className="pb-btn secondary">Delete Project</button>
          <button className="pb-btn primary"            onClick={() => setShowAddTask(!showAddTask)}>Add Task</button>
        </div>

      </div>

      {/* BOARD */}
      <div className="projectBoard-columns">
        {/* PLANNING */}
        <div className="projectBoard-column">
          <h3>Planning</h3>

          {project.status === "planning" && (
            <div className="projectBoard-card">
              <h4>{project.name}</h4>
              <p>{project.description}</p>
            </div>
          )}
        </div>

        {/* IN PROGRESS */}
        <div className="projectBoard-column">
          <h3>In Progress</h3>

          {project.status === "in-progress" && (
            <div className="projectBoard-card">
              <h4>{project.name}</h4>
              <p>{project.description}</p>
            </div>
          )}
        </div>

        {/* FINISHED */}
        <div className="projectBoard-column">
          <h3>Finished</h3>

          {project.status === "finished" && (
            <div className="projectBoard-card finished">
              <h4>{project.name}</h4>
              <p>{project.description}</p>
            </div>
          )}
        </div>
      </div>
      {showAddTask && (
        <AddTaskDropdown onClose={() => setShowAddTask(false)}  employees={employees} project={projectId}/>
      )}
    </div>
  );
}
