import "./App.css";
import { AddCompanyTable } from "./components/AddCompanyTable";
import { useVacanciesListQuery } from "./api/getVacancies.query";

function App() {
  const { data, isLoading, error } = useVacanciesListQuery();

  const handleAddEdit = () => {
    console.log("edit");
  };

  const handleDelete = () => {
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
        onEdit={handleAddEdit}
        onDelete={handleDelete}
      />
    </>
  );
}

export default App;
