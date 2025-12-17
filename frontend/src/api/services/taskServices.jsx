import api from "../axios";

export const createTask = (body) => {
    return api.post("/task", body);
}

export const getMyTasksForProject = (projectId) => {
  return api.get(`/task/${projectId}`);
}

export const updateTask = (id, body) => {
    return api.patch(`/task/${id}`, body);
}