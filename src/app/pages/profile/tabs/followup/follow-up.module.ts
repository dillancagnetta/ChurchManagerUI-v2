import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ProfileFollowUpComponent } from './follow-up.component';
import { FollowUpListComponent } from './components/follow-up-list/follow-up-list.component';
import { FollowUpListQueryComponent } from './components/follow-up-list-query/follow-up-list-query.component';
import { FollowUpFormComponent } from './components/follow-up-form/follow-up-form.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FuseCardModule } from '@fuse/components/card';
import { FuseAutogrowModule } from '@fuse/directives/autogrow';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { GeneralTableModule } from '@ui/components/general-table/general-table.module';

const routes: Routes = [
    {path: '', component: ProfileFollowUpComponent }
];

@NgModule({
  declarations: [
      ProfileFollowUpComponent,
      FollowUpListComponent,
      FollowUpListQueryComponent,
      FollowUpFormComponent
  ],
  imports: [
      RouterModule.forChild(routes),

      MatButtonModule,
      MatCheckboxModule,
      MatDatepickerModule,
      MatDialogModule,
      MatDividerModule,
      MatExpansionModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatMenuModule,
      MatPaginatorModule,
      MatProgressBarModule,
      MatSelectModule,
      MatSlideToggleModule,
      MatTableModule,
      MatTooltipModule,
      MatToolbarModule,

      // Fuse
      FuseCardModule,
      FuseAutogrowModule,
      FuseAlertModule,
      FuseScrollbarModule,
      FuseFindByKeyPipeModule,
      SharedModule,

      // UI Controls
      GeneralTableModule,
  ]
})
export class FollowUpModule { }
