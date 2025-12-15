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