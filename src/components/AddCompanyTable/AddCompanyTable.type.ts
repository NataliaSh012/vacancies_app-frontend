import { Vacancy } from '../VacancyModal/VacancyModal.type';

export type AddCompanyTableComponentProps = {
  onEdit: (row: Vacancy) => void;
  onDelete: (id: string) => void;
  data: Array<{
    company: string;
    position: string;
    salary: string;
    status: string;
    note: string;
    _id: string;
  }>;
  children?: React.ReactNode;
};

