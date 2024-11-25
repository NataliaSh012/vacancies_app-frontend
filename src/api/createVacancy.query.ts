import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client, QueryKeys } from "./shared";
import { Vacancy } from "@src/components/VacancyModal/VacancyModal.type";

export const useCreateVacancyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newVacancy: Vacancy) =>
      client.post("/", newVacancy).then((response) => response.data),
    onSuccess: (newVacancy) => {
      queryClient.setQueryData([QueryKeys.GetVacanciesList], (oldData: any) => {
        console.log(newVacancy)
        if (!oldData || !oldData.data) return { data: [newVacancy.data] };
        const updatedVacancies = [...oldData.data, newVacancy.data];

        return {
          ...oldData,
          data: updatedVacancies,
        };
      });
    },
    onError: (error) => {
      console.error("Error creating vacancy:", error);
    },
  });
};
