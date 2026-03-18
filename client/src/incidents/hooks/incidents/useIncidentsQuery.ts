import { getIncidents } from "@/incidents/api/incidents";
import { useQuery } from "@tanstack/react-query";

export default function useIncidents(page?: number) {
  const query = useQuery({
    queryKey: ["incidents", page],
    queryFn: () => getIncidents(page),
    placeholderData: (prev) => prev,
  });

  return query;
}
