import { createIncident } from "@/incidents/api/incidents";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateIncidentMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createIncident,
    onSuccess: () => {
      //invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
    },
  });

  return mutation;
}
