import {Injectable} from "@angular/core";
import {CrudService} from "@shared/api/crud-http-base.service";
import {ChurchesGeneralFilter, ChurchGroupEntity} from "@features/admin/churches/churches.model";

@Injectable()
export class ChurchGroupsDataService extends CrudService<ChurchGroupEntity, ChurchesGeneralFilter> {

  protected entityUrl: string = 'churchGroups';
}