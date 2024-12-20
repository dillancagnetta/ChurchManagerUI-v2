import { FuseNavigationItem } from '@fuse/components/navigation';
import { Message } from 'app/ui/layout/common/messages/messages.types';
import { Notification } from 'app/ui/layout/common/notifications/notifications.types';
import { Shortcut } from 'app/ui/layout/common/shortcuts/shortcuts.types';
import { User } from '@core/user/user.model';

export interface InitialData
{
    messages: Message[];
    navigation: {
        compact: FuseNavigationItem[],
        default: FuseNavigationItem[],
        futuristic: FuseNavigationItem[],
        horizontal: FuseNavigationItem[]
    };
    notifications: Notification[];
    shortcuts: Shortcut[];
    // user: User;
}
