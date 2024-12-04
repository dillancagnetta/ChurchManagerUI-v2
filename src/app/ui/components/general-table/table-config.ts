import {TableColumn} from "@ui/components/general-table/table-column";
import {TableBtn, TableToolbar} from "@ui/components/general-table/table-btn";

export interface TableConfig {
  columns: TableColumn[];
  buttons?: TableBtn[];
  toolbar?: TableToolbar[];
  title?: string;
  selectable?: boolean;
  showLoader?: boolean;
  isLoading?: boolean;
  drawerEnabled?: boolean;
  filter?: boolean;
  filterPlaceholder?: string;
  footer?: string;
  pagination?: number[];
  pageSize?: number;
  tableMinWidth?: number;
}

// Helper function to create table config with defaults
export function createTableConfig(config: Partial<TableConfig>): TableConfig {
  return {
    columns: [],
    buttons: [],
    toolbar: [],
    selectable: false,
    showLoader: true,
    isLoading: false,
    drawerEnabled: false,
    filter: true,
    filterPlaceholder: '',
    pagination: [5, 25, 100],
    pageSize: 10,
    tableMinWidth: 500,
    ...config
  };
}