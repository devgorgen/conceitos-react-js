import api from "./api";

export const getRepositories = async () => {
  return await api.get("/repositories");
};

export const addRepository = async (data) => {
  return await api.post("/repositories", data);
};

export const deleteRepository = async (id) => {
  return await api.delete(`/repositories/${id}`);
};
