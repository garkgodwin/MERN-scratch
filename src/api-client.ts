import axios from "axios";
import { API_SERVER_URL } from "./public-config";

export const fetchProjects = async () => {
  const resp = await axios.get(`${API_SERVER_URL}/projects`);
  return resp.data;
};

export const fetchProject = async (projectId) => {
  const resp = await axios.get(
    `${API_SERVER_URL}/projects/${projectId}`,
  );
  return resp.data;
};

export const addTaskToProject = async (
  projectId,
  newTaskValue,
) => {
  const resp = await axios.post(
    `${API_SERVER_URL}/projects/${projectId}`,
    { newTaskValue },
  );
  return resp.data;
};
