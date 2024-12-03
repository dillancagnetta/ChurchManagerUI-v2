import {Injectable} from "@angular/core";
import {CrudService} from "@shared/api/crud-http-base.service";
import {ChurchEntity, ChurchesGeneralFilter} from "@features/admin/churches/churches.model";

@Injectable()
export class ChurchDataService extends CrudService<ChurchEntity, ChurchesGeneralFilter> {

  protected entityUrl: string = 'churches';
}