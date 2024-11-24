export type VacancyModalComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  vacancy: Vacancy | null;
  children?: React.ReactNode;
};

export type Vacancy = {
  company: string;
  position: string;
  salary: string;
  status: string;
  note: string;
};