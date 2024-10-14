import { UntypedFormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

export abstract class QueryBase<TQuery>
{
    searchForm: UntypedFormGroup;
    searchBtnClicked = new Subject();

    query$: Observable<TQuery>;

    protected unsubscribeAll = new Subject<any>();
}
