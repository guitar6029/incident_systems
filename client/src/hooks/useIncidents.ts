import { getIncidents } from "@/api/incidents";
import { useQuery } from "@tanstack/react-query";

export default function useIncidents() {
  const query = useQuery({
    queryKey: ["incidents"],
    queryFn: getIncidents,
    //placeholderData: (prev) => prev,
  });

  return query;
}
