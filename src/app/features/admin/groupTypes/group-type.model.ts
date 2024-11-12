import {Entity, Filter} from "@core/store/crud-state.feature";

export interface GroupTypeEntity extends Entity {
  name: string;
  description: string;
  groupTerm?: string;
  groupMemberTerm?: string;
  takesAttendance: boolean;
  isSystem: boolean;
  iconCssClass?: string;
}

export interface GroupTypeFilter  {
  nameOrDescription?: string;
  takesAttendance?: boolean;
  isSystem?: boolean;
}
