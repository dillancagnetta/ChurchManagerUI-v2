import {Component} from "@angular/core";
import {FuseScrollbarModule} from "@fuse/directives/scrollbar";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {RouterLink} from "@angular/router";
import {
  ChurchGroupsMasterDetailList
} from "@features/admin/churches/_ui/master-detail-list/church-groups-master-detail-list";

@Component({
  templateUrl: './churches.component.html',
  standalone: true,
  imports: [
    FuseScrollbarModule,
    MatButton,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    RouterLink,
    MatMenuTrigger,
    ChurchGroupsMasterDetailList

  ],
  providers:[]
})
export class ChurchesComponent {
  gotoReports() {

  }
}