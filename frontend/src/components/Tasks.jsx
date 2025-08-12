import { useEffect, useState } from "react";
import api from "../api/axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  const handleFetchTasks = async () => {
    try {
      const { data } = await api.get("/tasks");

      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleFetchTasks();
  }, []);

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id}>
              {task.title} {task.isDone ? "✅" : "❌"}
            </li>
          ))
        ) : (
          <p>No tasks</p>
        )}
      </ul>
    </div>
  );
}

export default Tasks;
