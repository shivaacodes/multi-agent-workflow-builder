// helper function

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000", // backend FastAPI
  withCredentials: true, // only if you use cookies/auth
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Workflows
export const getWorkflows = () => API.get("/workflows/");
export const getWorkflow = (id: number) => API.get(`/workflows/${id}`);
export const createWorkflow = (data: any) => API.post("/workflows/", data);
export const updateWorkflow = (id: number, data: any) => API.put(`/workflows/${id}`, data);
export const deleteWorkflow = (id: number) => API.delete(`/workflows/${id}`);

export const getMe = () => API.get("/auth/me");

// Steps
export const addStep = (workflowId: number, data: any) => API.post(`/workflows/${workflowId}/steps`, data);
export const updateStep = (stepId: number, data: any) => API.put(`/workflows/steps/${stepId}`, data);
export const deleteStep = (stepId: number) => API.delete(`/workflows/steps/${stepId}`);
