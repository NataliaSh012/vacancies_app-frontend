import { Vacancy } from '@src/type/vacancies.type';

export type VacancyModalComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Vacancy) => void;
  vacancy: Vacancy | null;
  children?: React.ReactNode;
};

