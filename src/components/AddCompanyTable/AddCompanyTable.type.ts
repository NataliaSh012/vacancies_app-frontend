export type AddCompanyTableComponentProps = {
  onEdit: (row: TableRow) => void;
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

export interface TableRow {
  company: string;
  position: string;
  salary: string;
  status: string;
  note: string;
  _id: string;
}
