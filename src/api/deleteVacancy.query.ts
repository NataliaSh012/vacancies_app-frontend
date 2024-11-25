import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client, QueryKeys } from "./shared";
import { Vacancy } from '@src/components/VacancyModal/VacancyModal.type';

export const useDeleteVacancyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      client.delete(`/${id}`).then((response) => response.data),
    onSuccess: (deletedVacancy) => {
      queryClient.setQueryData([QueryKeys.GetVacanciesList], (oldData: any) => {
        if (!oldData || !oldData.data) return oldData;
        const updatedVacancies = oldData.data.filter(
          (vacancy: Vacancy) => vacancy._id !== deletedVacancy.data._id
        );

        return {
          ...oldData,
          data: updatedVacancies,
        };
      });
    },
    onError: (error) => {
      console.error("Error deleting vacancy:", error);
    },
  });
};
