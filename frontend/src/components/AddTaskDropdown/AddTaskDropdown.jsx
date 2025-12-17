import { useState } from "react";
import "./AddTaskDropdown.css";
import { createTask } from "../../api/services/taskServices";


export default function AddTaskDropDown({ employees, onClose, project }) {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [title, setTaskTitle] = useState("");
  const [description, setTaskDesc] = useState("");

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setTaskTitle("");
    setTaskDesc("");
  };

  const handleAddTask = () => {
    try {
      const res = createTask({ title, description, project, assignedTo: selectedEmployee._id });

      const message = res.data.message;
      const task = res.data.task;
      console.log(message, " ", task);

      setTaskTitle("");
      setTaskDesc("");
      setSelectedEmployee(null);

    } catch (err) {
      console.error("Error while creating task: ", err);
    }
  
  };

  return (
    <div className="addtask-modal-overlay" onClick={onClose}>
      <div className="addtask-modal-container" onClick={(e) => e.stopPropagation()}>
        <h3>Add Task</h3>

        <div className="addtask-employee-list">
          {employees.map((emp) => (
            <div key={emp.id} className="addtask-employee">
              <button  onClick={() => handleEmployeeClick(emp)}>
                {emp.name}
              </button>
            </div>
          ))}

              {selectedEmployee && (
                <div className="addtask-dropdown">
                  <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTaskTitle(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Task description"
                    value={description}
                    onChange={(e) => setTaskDesc(e.target.value)}
                  />
                  <button onClick={handleAddTask}>Add Task</button>
                </div>
              )}
        </div>

        <button className="addtask-close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
}
