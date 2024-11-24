import { useQuery } from "@tanstack/react-query";
import { client, QueryKeys } from "./shared";

export const useVacanciesListQuery = () => {
  return useQuery({
    queryKey: [QueryKeys.GetVacanciesList],
   queryFn: ({ signal }) =>
      client.get("/", { signal }).then((response) => response.data), 
  });
};
