export type IncidentPayload = {
  title: string;
  description?: string;
  severity: "low" | "medium" | "high";
  status?: "open" | "in_progress" | "resolved" | "cancelled";
};
