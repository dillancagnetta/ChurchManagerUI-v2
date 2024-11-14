import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges, ViewEncapsulation, input } from '@angular/core';
import { FamilyMember } from '../person-form/person-form.model';
import { MatTableDataSource } from '@angular/material/table';

/*
*  https://stackoverflow.com/questions/51150193/angular-material-editable-table-using-formarray
* */
@Component({
    selector     : 'people-family-members-list',
    templateUrl  : './family-members-list.component.html',
    styleUrls    : ['./family-members-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FamilyMembersListComponent implements OnChanges
{
    familyMembers = input<FamilyMember[]>([]);

    displayedColumns: string[] = ['firstName', 'lastName', 'gender', 'ageClassification'];
    dataSource: MatTableDataSource<FamilyMember> = new MatTableDataSource([]);

    ngOnChanges( changes: SimpleChanges ): void
    {
        if ( changes['familyMembers'] ) {
            this.dataSource.data = changes['familyMembers'].currentValue as FamilyMember[];
        }
    }
}