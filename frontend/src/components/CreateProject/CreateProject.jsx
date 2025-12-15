import "./CreateProject.css";
import { createProject } from "../../api/services/projectServices";
import { useState } from "react";

export default function CreateProject({ onClose }) {

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await createProject( { name, description, deadline });

        setSuccess(true);
        setError("");
        onClose(false); 

    } catch (err) {
        setError(err.response?.data?.message || "Something went wrong...");
        setSuccess(false);
    }
  };


  return (
    <div className="cp-overlay" onClick={ () => onClose(false) }>
      <div
        className="cp-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="cp-title">Create Project</h2>

        <div className="cp-field">
          <label>Project Name</label>
          <input type="text" placeholder="Enter project name" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="cp-field">
          <label>Description</label>
          <textarea placeholder="Project description..." value={description} onChange={(e) => setDescription(e.target.value)}/>
        </div>

        <div className="cp-field">
          <label>Deadline</label>
          <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)}/>
        </div>

        <div className="cp-actions">
          <button className="cp-cancel" onClick={() => onClose(false) }>
            Cancel
          </button>
          <button className="cp-submit" onClick={handleSubmit}>
            Create
          </button>
        </div>

        {success && <p className="success-msg">You've successfully created project.</p>}
        {error && <p className="error-msg">{error}</p>}
        
      </div>
    </div>
  );
}
