import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client, QueryKeys } from "./shared";
import { Vacancy } from "@src/type/vacancies.type";

export const useEditVacancyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      updatedVacancy,
    }: {
      id: string | undefined;
      updatedVacancy: Vacancy;
    }) =>
      client.patch(`/${id}`, updatedVacancy).then((response) => response.data),
    onSuccess: (updatedVacancy) => {
      queryClient.setQueryData([QueryKeys.GetVacanciesList], (oldData: any) => {
        if (!oldData || !oldData.data) return oldData;
        const updatedVacancies = oldData.data.map((vacancy: Vacancy) =>
          vacancy._id === updatedVacancy.data._id
            ? updatedVacancy.data
            : vacancy
        );

        return {
          ...oldData,
          data: [...updatedVacancies],
        };
      });
    },
    onError: (error) => {
      console.error("Error editing vacancy:", error);
    },
  });
};
