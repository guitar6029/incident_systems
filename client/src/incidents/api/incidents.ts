import { API_BASE } from "@/lib/constants";
import { apiClient } from "@/lib/apiClient";
import type { IncidentPayload } from "@/types/Incident/IncidentPayload";
import type { IncidentResponse } from "@/types/Incident/IncidentResponse";
import type { PaginatedResponse } from "@/types/PaginatedResponse";
import type { Incident } from "@/types/Incident/incident";

export const getIncidents = async (
  page = 1,
): Promise<PaginatedResponse<Incident>> => {
  const response = await fetch(`${API_BASE}incidents?page=${page}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Incidents request failed");
  }

  const data = await response.json();
  return data;
};

export const createIncident = async (
  data: IncidentPayload,
): Promise<IncidentResponse> => {
  return apiClient("incidents", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
