import {ChangeDetectionStrategy, Component, signal, ViewEncapsulation} from '@angular/core';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import {createTableConfig, TableBtn, TableColumn, TableConfig, TableToolbar} from '@ui/components/general-table';
import { UserData } from '@features/admin/example/mock/interfaces/user-data';
import { createNewUserData } from '@features/admin/example/mock/functions/mock-data';
import { GroupAttendanceRecord } from '@features/admin/groups/cell-ministry/cell-ministry.model';
import {GroupTypeEntity} from "@features/admin/groupTypes/group-type.model";
import {ButtonActions} from "@shared/shared.models";

@Component({
    selector     : 'example',
    templateUrl  : './example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent
{
    introText = 'Button actions and payloads come here in textual form';
    columns: TableColumn[];   // this will define what you pass over to the table
    toolbar: TableToolbar[];   // this will define what you pass over to the table
    pagingColumns: TableColumn[];   // this will define what you pass over to the table
    buttons: TableBtn[] = [];      // this will define what you pass over to the table
    data: UserData[];         // this is example data but you can use any object to pass to the table
    totalVolume: number = 0;  // this is an example field used to show how you can access filtered data from the table
    totalRides: number = 0;
    footer: string = '';      // in this example I'm using a dynamic footer which changes with the filtered data

    $tableConfig = signal<TableConfig>(createTableConfig({
      columns: [
        { columnDef: 'date',     header: 'Datum',    cell: (element: UserData) => `${element.date.toLocaleDateString()}` },
        { columnDef: 'name',     header: 'Name',     cell: (element: UserData) => `${element.name}` },
        { columnDef: 'volume',   header: 'Volume',   cell: (element: UserData) => `${element.volume} m³` },
        { columnDef: 'rides',    header: 'Trips',    cell: (element: UserData) => `${element.rides}` },
        { columnDef: 'material', header: 'Material', cell: (element: UserData) => `${element.material}` },
      ],
      buttons: [
        { styleClass: 'btn btn-success px-2',     icon: 'note_add',    payload: (element: UserData) => `${element.id}`, action: 'add', text: 'Add' },
        { styleClass: 'btn btn-primary px-2',     icon: 'build',    payload: (element: UserData) => `${element.id}`, action: 'edit', text: 'Edit' },
        { styleClass: 'btn btn-primary px-2',     icon: 'delete',    payload: (element: UserData) => `${element.id}`, action: 'delete', text: 'Remove' },
      ],
      toolbar: [
        {icon: 'add', color: 'primary', tooltip: 'Add item', action: 'add', text: 'Add'},
        {icon: 'cloud_download', color: 'primary', tooltip: 'Export to csv', action: 'export', text: 'Export', disabled: true },
      ],
      title: 'General Table',
      drawerEnabled: true,
      footer: this.footer,
      tableMinWidth: 400
    }));

    $pagingTableConfig = signal<TableConfig>(createTableConfig({
      columns: [
        { columnDef: 'attendanceDate',     header: 'Attendance Date',    cell: (element: GroupAttendanceRecord) => {
            const dateString = element.attendanceDate as string;
            const date = new Date(dateString);
            return `${date.toLocaleString('en-ZA', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}`;
          } },
        { columnDef: 'groupName',     header: 'Group',     cell: (element: GroupAttendanceRecord) => `${element.groupName}` },
        { columnDef: 'attendanceCount',   header: 'Attendance',   cell: (element: GroupAttendanceRecord) => `${element.attendanceCount}` },
        { columnDef: 'firstTimerCount',    header: 'First Timers',    cell: (element: GroupAttendanceRecord) => `${element.firstTimerCount}` },
        { columnDef: 'newConvertCount', header: 'New Converts', cell: (element: GroupAttendanceRecord) => `${element.newConvertCount}` },
      ],
      toolbar: [
        {icon: 'add', color: 'primary', tooltip: 'Add item', action: 'add', text: 'Add'},
        {icon: 'cloud_download', color: 'primary', tooltip: 'Export to csv', action: 'export', text: 'Export', disabled: true },
      ],
      title: 'Paging Table',
      drawerEnabled: true,
      selectable: true,
      filter: true,
      tableMinWidth: 400
    }));

    /**
     * Constructor
     */
    constructor(
        private _fuseConfirmationService: FuseConfirmationService
    )
    {
        // Create 100 userdata objects
        this.data = Array.from({length: 100}, (_, k) => createNewUserData(k + 1));

        // build the colums; columnDef: attribute name; header: column title; cell: row text
        // note that the cell attribute is the same as the columnDef attribute
        /*this.columns = [
            { columnDef: 'date',     header: 'Datum',    cell: (element: UserData) => `${element.date.toLocaleDateString()}` },
            { columnDef: 'name',     header: 'Name',     cell: (element: UserData) => `${element.name}` },
            { columnDef: 'volume',   header: 'Volume',   cell: (element: UserData) => `${element.volume} m³` },
            { columnDef: 'rides',    header: 'Trips',    cell: (element: UserData) => `${element.rides}` },
            { columnDef: 'material', header: 'Material', cell: (element: UserData) => `${element.material}` },
        ];*/

        // build the buttons; styleClass: button style; icon: which material icon should be used; payload: what value from the object should be returned; action: what name should the action have
       /* this.buttons = [
            { styleClass: 'btn btn-success px-2',     icon: 'note_add',    payload: (element: UserData) => `${element.id}`, action: 'add', text: 'Add' },
            { styleClass: 'btn btn-primary px-2',     icon: 'build',    payload: (element: UserData) => `${element.id}`, action: 'edit', text: 'Edit' },
            { styleClass: 'btn btn-primary px-2',     icon: 'delete',    payload: (element: UserData) => `${element.id}`, action: 'delete', text: 'Remove' },
        ];*/


        /*
        *  Paginated Grid Example
        * */
        this.pagingColumns = [
            { columnDef: 'attendanceDate',     header: 'Attendance Date',    cell: (element: GroupAttendanceRecord) => {
               const dateString = element.attendanceDate as string;
               const date = new Date(dateString);
                return `${date.toLocaleString('en-ZA', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                })}`;
            } },
            { columnDef: 'groupName',     header: 'Group',     cell: (element: GroupAttendanceRecord) => `${element.groupName}` },
            { columnDef: 'attendanceCount',   header: 'Attendance',   cell: (element: GroupAttendanceRecord) => `${element.attendanceCount}` },
            { columnDef: 'firstTimerCount',    header: 'First Timers',    cell: (element: GroupAttendanceRecord) => `${element.firstTimerCount}` },
            { columnDef: 'newConvertCount', header: 'New Converts', cell: (element: GroupAttendanceRecord) => `${element.newConvertCount}` },
        ];

        this.toolbar = [
          {icon: 'add', color: 'primary', tooltip: 'Add item', action: 'add', text: 'Add'},
          {icon: 'cloud_download', color: 'primary', tooltip: 'Export to csv', action: 'export', text: 'Export', disabled: true },
        ];
    }

    /**
     * Open confirmation dialog
     */
    openConfirmationDialog(): void
    {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Confirm Action',
            message: 'Do you want to confirm this action?',
            actions: {
                confirm: {
                    label: 'Confirm'
                }
            }
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If the confirm button pressed...
            if ( result === 'confirmed' )
            {
                console.log('The user confirmed the action');
            }
        });

    }

    onButtonClicked( action: string[] ) {
        console.log('table button clicked: ',  action);
    }
}
