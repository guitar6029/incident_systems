import { getIncidents } from "@/api/incidents";
import { useEffect } from "react";
import { toast } from "sonner";
import { useState } from "react";
import type { Incident } from "@/types/Incident/incident";
import { Link } from "react-router-dom";
function Incidents() {
  const [incidents, setIncidents] = useState<Incident[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const data = await getIncidents();

        setIncidents(data);
        setLoading(false);
      } catch (error) {
        console.error(`Error : ${error}`);
        toast.error("Error fetching incidents.");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <h1>Incidents</h1>
      <div className="flex w-full items-end justify-end">
        <Link to="/incidents/incident-new">
          <button>Create Incident</button>
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {incidents?.map((incident: Incident) => {
          return (
            <div key={incident.id}>
              <span>{incident.id}</span>
              <span>{incident.title}</span>
              <span>{incident.description}</span>
              <span>{incident.status}</span>
              <span>{incident.severity}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Incidents;
