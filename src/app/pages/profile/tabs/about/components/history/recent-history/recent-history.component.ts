import {ChangeDetectionStrategy, Component, input} from "@angular/core";
import {History} from '../../../../../profile.model';


@Component({
  selector: 'cm-profile-recent-history',
  templateUrl: './recent-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentHistoryComponent {
  // Inputs
  $history = input([]);

  /**
   * Returns whether the given dates are different days
   *
   * @param currentDateStr
   * @param nextDateStr
   */
  isSameDay(currentDateStr: string, nextDateStr: string): boolean {
    const current = new Date(currentDateStr);
    const compare = new Date(nextDateStr);

    return current.getFullYear() == compare.getFullYear() &&
      current.getMonth() == compare.getMonth() &&
      current.getDay() == compare.getDay()
  }

  goToRelatedRecord(activity: History): string {
    const url = activity.verb == 'ADDEDTOGROUP' ? '/apps/groups/'+ activity.relatedEntityId : '';
    return url;
  }
}