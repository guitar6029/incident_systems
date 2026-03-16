import { useEffect } from "react";

function Incidents() {
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const result = await fetch("http://127.0.0.1:8000/api/incidents");
        if (!result.ok) {
          throw new Error("Error");
        }
        const data = await result.json();
        console.log("data : ", data);
      } catch (error) {
        console.error(`Error : ${error}`);
      }
    };

    fetchIncidents();
  }, []);

  return (
    <div>
      <h1>Incidents</h1>
    </div>
  );
}

export default Incidents;
