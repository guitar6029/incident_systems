import type { Incident } from "@/types/Incident/incident";
import { Link } from "react-router-dom";
import useIncidents from "@/hooks/useIncidents";
function Incidents() {
  const { data, isError, isLoading } = useIncidents();
  const incidents = data?.data ?? [];
  const total = data?.total;
  const page = data?.current_page;

  if (isError) {
    return <div>Something went wrong</div>;
  }

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <h1>Incidents {total}</h1>
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
