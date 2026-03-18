import { Link } from "react-router-dom";
import useIncidents from "@/incidents/hooks/incidents/useIncidentsQuery";
import { useState } from "react";

function Incidents() {
  const [page, setPage] = useState(1);

  const { data, isError, isLoading } = useIncidents(page);
  const incidents = data?.data ?? [];
  const totalPages = data?.last_page ?? 1;

  if (isError) {
    return <div>Something went wrong</div>;
  }

  if (isLoading) {
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
        {incidents?.map((incident) => {
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
      <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
        Previous
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page >= totalPages}
        onClick={() => setPage((p) => p + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Incidents;
