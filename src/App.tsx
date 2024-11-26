import "./App.css";
import { useState } from "react";
import { AddCompanyTable } from "@src/components/AddCompanyTable";
import { useVacanciesListQuery } from "@src/api/getVacancies.query";
import { VacancyModal } from "@src/components/VacancyModal";
import { Vacancy } from "@src/type/vacancies.type";
import { useEditVacancyMutation } from "@src/api/editVacancy.query";
import { useCreateVacancyMutation } from "@src/api/createVacancy.query";
import { useDeleteVacancyMutation } from "@src/api/deleteVacancy.query";
import {
  editVacancy,
  updateVacancy,
  deleteVacancy,
} from "@src/utils/vacancies.utils";

function App() {
  const { data, isLoading, error } = useVacanciesListQuery();
  const [isModalOpen, setModalOpen] = useState(false);
  const { mutate: editMutate } = useEditVacancyMutation();
  const { mutate: createMutate } = useCreateVacancyMutation();
  const { mutate: deleteMutate } = useDeleteVacancyMutation();
  const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);

  const closeModal = () => {
    setEditingVacancy(null);
    setModalOpen(false);
  };

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  const vacancies = data?.data || [];

  return (
    <div className="main">
      <h1>Список вакансий</h1>
      <AddCompanyTable
        data={vacancies}
        onEdit={(vacancy) =>
          editVacancy(vacancy, setEditingVacancy, setModalOpen)
        }
        onDelete={(id) => deleteVacancy(id, deleteMutate)}
      />
      <button
        onClick={() => editVacancy(null, setEditingVacancy, setModalOpen)}
      >
        + Добавить
      </button>
      <VacancyModal
        isOpen={isModalOpen}
        onClose={closeModal}
        vacancy={editingVacancy}
        onSave={(updatedVacancy) =>
          updateVacancy(updatedVacancy, editMutate, createMutate, setModalOpen)
        }
      />
    </div>
  );
}

export default App;
