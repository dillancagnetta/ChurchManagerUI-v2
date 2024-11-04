export interface TableColumn {
  columnDef: string;
  header: string;
  cell: (any) => string;
  columnType?: 'text' | 'checkbox' | 'icon';
}
