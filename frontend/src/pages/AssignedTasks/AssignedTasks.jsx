import "./AssignedTasks.css";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { getMyTasksForProject, updateTask } from "../../api/services/taskServices";
import { AuthContext } from "../../contex/AuthContext";

export default function AssignedTasks() {
  
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [draggedTask, setDraggedTask] = useState(null);
  const { user } = useContext(AuthContext);

  const fetchTasks = async () => {
    try {
    const res = await getMyTasksForProject( projectId );
      setTasks(res.data.tasks);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);


  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDrop = async (status) => {
    if (!draggedTask) return;

    setTasks((prev) =>
      prev.map((t) =>
        t._id === draggedTask._id ? { ...t, status } : t
      )
    );

    try {
      await updateTask(draggedTask._id, { status });
    } catch (err) {
      console.error("Failed to update task", err);
    }

    setDraggedTask(null);
  };

  const renderTasks = (status) =>
    tasks
      .filter((t) => t.status === status)
      .map((task) => (
        <div
          key={task._id}
          className="assignedTask-card"
          draggable
          onDragStart={() => handleDragStart(task)}
        >
          <h4>{task.title}</h4>
          <p>{task.description || "No description"}</p>
        </div>
      ));

  return (
    <div className="assignedTasks-container">
      <div className="assignedTasks-content">
        <h2 className="assignedTasks-title">My Tasks</h2>

        <div className="assignedTasks-board">
          {/* PLANNING */}
          <div
            className="assignedTasks-column"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop("planning")}
          >
            <h3>Planning</h3>
            {renderTasks("planning")}
          </div>

          {/* IN PROGRESS */}
          <div
            className="assignedTasks-column"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop("in-progress")}
          >
            <h3>In Progress</h3>
            {renderTasks("in-progress")}
          </div>

          {/* FINISHED */}
          <div
            className="assignedTasks-column"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop("finished")}
          >
            <h3>Finished</h3>
            {renderTasks("finished")}
          </div>
        </div>
      </div>
    </div>
  );
}
