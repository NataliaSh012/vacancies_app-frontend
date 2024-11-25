import "./App.css";
import { useState } from "react";
import { AddCompanyTable } from "./components/AddCompanyTable";
import { useVacanciesListQuery } from "./api/getVacancies.query";
import { VacancyModal } from "./components/VacancyModal";
import { Vacancy } from "./components/VacancyModal/VacancyModal.type";
import { useEditVacancyMutation } from "./api/editVacancy.query";
import { useCreateVacancyMutation } from "./api/createVacancy.query";

function App() {
  const { data, isLoading, error } = useVacanciesListQuery();
  const [isModalOpen, setModalOpen] = useState(false);
  const { mutate: editMutate } = useEditVacancyMutation();
  const { mutate: createMutate } = useCreateVacancyMutation();
  const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);

  const editVacancy = (vacancy: Vacancy | null) => {
    if (!isModalOpen) {
      setEditingVacancy(vacancy);
      setModalOpen(true);
    }
  };

  const updateVacancy = (updatedVacancy: Vacancy) => {
    console.log(updatedVacancy);
    setModalOpen(false);
    if (updatedVacancy._id) {
      editMutate({
        id: updatedVacancy?._id,
        updatedVacancy,
      });
    } else {
      createMutate(updatedVacancy);
    }
  };

  const closeModal = () => {
    setEditingVacancy(null);
    setModalOpen(false);
  };

  const deleteVacancy = () => {
    console.log("delete");
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const vacancies = data?.data || [];
  return (
    <>
      <h1>table</h1>
      <AddCompanyTable
        data={vacancies}
        onEdit={editVacancy}
        onDelete={deleteVacancy}
      />
      <button onClick={() => editVacancy(null)}>+ Add Vacancy</button>
      <VacancyModal
        isOpen={isModalOpen}
        onClose={closeModal}
        vacancy={editingVacancy}
        onSave={updateVacancy}
      />
    </>
  );
}

export default App;
