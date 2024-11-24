import "./App.css";
import { useState } from "react";
import { AddCompanyTable } from "./components/AddCompanyTable";
import { useVacanciesListQuery } from "./api/getVacancies.query";
import { VacancyModal } from "./components/VacancyModal";
import { TableRow } from "./components/AddCompanyTable/AddCompanyTable.type";

function App() {
  const { data, isLoading, error } = useVacanciesListQuery();
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState<TableRow | null>(null);

  const editVacancy = (vacancy: TableRow | null) => {
    if (!isModalOpen) {
      setEditingVacancy(vacancy);
      setModalOpen(true); 
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
      <button
        onClick={() => editVacancy(null)}
        style={{ marginBottom: "10px", padding: "10px", cursor: "pointer" }}
      >
        + Add Vacancy
      </button>
        <VacancyModal
          isOpen={isModalOpen}
          onClose={closeModal}
          vacancy={editingVacancy}
        />
    </>
  );
}

export default App;
