import { createIncident } from "@/incidents/api/incidents";
import type { IncidentPayload } from "@/types/Incident/IncidentPayload";
import { SEVERITY_LEVELS } from "@/types/Severity/SeverityLevels";
import { STATUS_LEVELS } from "@/types/Status/IncidentStatusLevels";
import type { FormEvent } from "react";
import { toast } from "sonner";
import useCreateIncidentMutation from "@/incidents/hooks/incidents/useCreateIncidentMutation";
export default function CreateIncident() {
  const mutation = useCreateIncidentMutation();

  async function handleCreateIncident(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const incident: IncidentPayload = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      severity: formData.get("severity") as IncidentPayload["severity"],
      status: formData.get("status") as IncidentPayload["status"],
    };

    mutation.mutate(incident, {
      onSuccess: () => {
        toast.success("Incident created");
        e.currentTarget.reset();
      },
    });
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
