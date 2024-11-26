import { Vacancy } from "@src/type/vacancies.type";

export const editVacancy = (
  vacancy: Vacancy | null,
  setEditingVacancy: React.Dispatch<React.SetStateAction<Vacancy | null>>,
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setEditingVacancy(vacancy);
  setModalOpen(true);
};

export const updateVacancy = (
  updatedVacancy: Vacancy,
  editMutate: (params: { id: string; updatedVacancy: Vacancy }) => void,
  createMutate: (vacancy: Vacancy) => void,
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setModalOpen(false);
  if (updatedVacancy._id) {
    editMutate({
      id: updatedVacancy._id,
      updatedVacancy,
    });
  } else {
    createMutate(updatedVacancy);
  }
};

export const deleteVacancy = (
  id: string,
  deleteMutate: (id: string) => void
) => {
  if (window.confirm("Are you sure you want to delete this vacancy?")) {
    deleteMutate(id);
  }
};
