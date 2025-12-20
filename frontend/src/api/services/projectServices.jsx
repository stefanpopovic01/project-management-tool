import api from "../axios";

export const createProject = (body) => {
    return api.post("/project", body);
}

export const getProjects = () => {
    return api.get("/project");
}

export const inviteUser = (body) => {
    return api.post("/project/invite", body);
}

export const getInvites = () => {
    return api.get("/project/invites");
}

export const respondToInvite = (body) => {
    return api.patch("/project/invite/respond", body);
}

export const assignedProjects = () => {
    return api.get("/project/assigned-projects");
}

export const getProjectById = (projectId) => {
  return api.get(`/project/single/${projectId}`);
}

export const getEmployees = (projectId) => {
  return api.get(`/project/employees/${projectId}`);
}

export const fetchUserProjects = (id) => {
    return api.get(`/project/user-projects/${id}`);
}

export const fetchAssignedProjects = (id) => {
    return api.get(`/project/fetch-assigned-projects/${id}`);
}