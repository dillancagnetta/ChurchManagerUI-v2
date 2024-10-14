import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ReportTemplatesDataService } from '@features/common/reports/_services/report-templates-data.service';
import { Observable } from 'rxjs';
import * as WebDataRocks from 'webdatarocks';

@Injectable({
    providedIn: 'root'
})
    export class ReportTemplateResolver 
{
    /**
     * Constructor
     */
    constructor(private _data: ReportTemplatesDataService)
    {
    }

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WebDataRocks.Report>
    {
        /**
         * @summary this is specified on the route i.e. 'cell-ministry.module.ts'
         */
        const reportName = route.data['report'];

        if (!reportName) throw new Error('report name is required');

        return this._data.getReport$(reportName);
    }
}