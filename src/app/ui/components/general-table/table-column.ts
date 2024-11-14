export interface TableColumn {
  columnDef: string;
  header: string;
  cell: (any) => any;
  columnType?: 'text' | 'checkbox' | 'icon';
}
