import api from "../axios";

export const getUser = (id) => {
    return api.get(`/user/${id}`);
};
