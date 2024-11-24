import "./App.css";
import { AddCompanyTable } from "./components/AddCompanyTable";

const dummyData = [
  {
    company: "TechCorp",
    position: "Frontend Developer",
    salary: "$60,000 - $80,000",
    status: "Open",
    note: "Remote position available",
    _id: "1",
  },
  {
    company: "BizGroup",
    position: "Backend Developer",
    salary: "$70,000 - $90,000",
    status: "Closed",
    note: "On-site only",
    _id: "2",
  },
  {
    company: "Startup Inc.",
    position: "Full Stack Developer",
    salary: "$80,000 - $100,000",
    status: "Open",
    note: "Flexible working hours",
    _id: "3",
  },
  {
    company: "MegaCorp",
    position: "Project Manager",
    salary: "$90,000 - $120,000",
    status: "Open",
    note: "Experience with Agile required",
    _id: "4",
  },
  {
    company: "InnovateX",
    position: "Data Scientist",
    salary: "$100,000 - $130,000",
    status: "Closed",
    note: "PhD preferred",
    _id: "5",
  },
];

function App() {
  const handleAddEdit = () => {
    console.log("edit");
  };

  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <>
      <h1>table</h1>
      <AddCompanyTable
        data={dummyData}
        onEdit={handleAddEdit}
        onDelete={handleDelete}
      />
    </>
  );
}

export default App;
