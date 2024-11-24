import { useMutation } from "@tanstack/react-query";
import { client, QueryKeys } from "./shared";
import { Vacancy } from '@src/components/VacancyModal/VacancyModal.type';

export const useEditVacancyMutation = () => {
  return useMutation({
    mutationFn: ({
      id,
      updatedVacancy,
    }: {
      id: string | undefined;
      updatedVacancy: Vacancy;
    }) =>
      client
        .patch(`/vacancies/${id}`, updatedVacancy)
        .then((response) => response.data),
  });
};
