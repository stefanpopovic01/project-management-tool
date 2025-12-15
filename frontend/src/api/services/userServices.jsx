import api from "../axios";

export const getUsers = (search) => {
    return api.get("/user", { params: { search } });
}

export const getUser = (id) => {
    return api.get(`/user/${id}`);
}

export const editUser = (id, newData) => {
    return api.patch(`/user/${id}`, newData);
}