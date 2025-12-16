import { useState } from "react";
import "./AddTaskDropdown.css";


export default function AddTaskDropDown({ employees, onClose }) {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setTaskTitle(""); // reset input
  };

  const handleAddTask = () => {
    console.log(`Add task "${taskTitle}" to`, selectedEmployee);
    // kasnije ovde ide poziv API-ja
    setTaskTitle("");
    setSelectedEmployee(null);
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

              {selectedEmployee && (
                <div className="addtask-dropdown">
                  <input
                    type="text"
                    placeholder="Task title"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Task description"
                  />
                  <button onClick={handleAddTask}>Add Task</button>
                </div>
              )}
            </div>
          ))}
        </div>

        <button className="addtask-close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
}
