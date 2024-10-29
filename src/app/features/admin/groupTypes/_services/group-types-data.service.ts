import {Injectable} from "@angular/core";
import {CrudService} from "@shared/api/crud-http-base.service";
import {GroupTypeEntity} from "@features/admin/groupTypes/group-type.model";

export type GroupTypesFilter = {
  nameOrDescription?: string;
};


@Injectable()
export class GroupTypesDataService extends CrudService<GroupTypeEntity, GroupTypesFilter> {

    protected entityUrl: string = 'groupTypes';
}