import { API_BASE } from "@/lib/constants";
import { apiClient } from "@/lib/apiClient";
import type { Incident } from "@/types/Incident/incident";
import type { IncidentPayload } from "@/types/Incident/IncidentPayload";
import type { IncidentResponse } from "@/types/Incident/IncidentResponse";

export const getIncidents = async (): Promise<Incident[]> => {
  const response = await fetch(`${API_BASE}incidents`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Incidents request failed");
  }

  const json = await response.json();
  return json.data;
};

export const createIncident = async (
  data: IncidentPayload,
): Promise<IncidentResponse> => {
  return apiClient("incidents", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
