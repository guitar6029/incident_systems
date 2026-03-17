import { createIncident } from "@/api/incidents";
import type { IncidentPayload } from "@/types/Incident/IncidentPayload";
import { SEVERITY_LEVELS } from "@/types/Severity/SeverityLevels";
import { STATUS_LEVELS } from "@/types/Status/IncidentStatusLevels";
import type { FormEvent } from "react";
import { toast } from "sonner";

export default function CreateIncident() {
  async function handleCreateIncident(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const severity = formData.get("severity") as IncidentPayload["severity"];
    const status = formData.get("status") as IncidentPayload["status"];
    const incident: IncidentPayload = {
      title,
      description,
      severity,
      status,
    };
    try {
      await createIncident(incident);
      toast.success("Incident created");
      e.currentTarget.reset();
    } catch (e) {
      toast.error("Error creating incident");
    }
  }

  return (
    <form onSubmit={handleCreateIncident} className="flex flex-col gap-2 p-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" required />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="description">Description</label>
        <textarea
          rows={3}
          name="description"
          id="description"
          className="min-w-20"
        ></textarea>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="severity">Severity</label>
        <select name="severity" id="severity">
          {SEVERITY_LEVELS.map((item: string) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="title">Status</label>
        <select name="status" id="status">
          {STATUS_LEVELS.map((item: string) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Create Incident</button>
    </form>
  );
}
