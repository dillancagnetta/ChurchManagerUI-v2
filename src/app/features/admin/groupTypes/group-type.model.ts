import {Entity, Filter} from "@core/store/crud-state.feature";
import {FormControl} from "@angular/forms";

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


export interface GroupTypeForm {
  id: FormControl<number | null>;
  name: FormControl<string>;
  description: FormControl<string | null>;
  groupTerm: FormControl<string>;
  groupMemberTerm: FormControl<string>;
  takesAttendance: FormControl<boolean>;
  isSystem: FormControl<boolean>;
  iconCssClass: FormControl<string | null>;
}