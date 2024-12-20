/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboard',
        title   : 'Dashboard',
        type    : 'basic',
        icon    : 'heroicons_outline:home',
        link : '/dashboard',
    },
    {
        id      : 'apps.people',
        title   : 'People',
        type    : 'aside',
        icon    : 'heroicons_outline:user-group',
        children: [
            {
                id      : 'people.new-family',
                title   : 'New Family',
                subtitle: 'Add a new family',
                type    : 'basic',
                icon    : 'heroicons_outline:user-group',
                link    : '/apps/people/new-family',
                exactMatch: true
            },
            {
                id      : 'people.families',
                title   : 'Families',
                subtitle: 'Families Directory',
                type    : 'basic',
                icon    : 'heroicons_outline:table',
                link    : '/apps/people/families/list',
                exactMatch: true
            },
            {
                id   : 'people.contacts',
                title: 'People',
                subtitle: 'People directory',
                type : 'basic',
                icon : 'heroicons_outline:users',
                link : '/apps/people',
                exactMatch: true
            },
        ] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id   : 'apps.churches',
        title: 'Churches',
        type : 'aside',
        icon : 'heroicons_outline:building-library',
        children: [
          {
            id   : 'churches.dashboard',
            title: 'Dashboard',
            subtitle: 'Churches overview',
            type : 'basic',
            icon : 'heroicons_outline:home',
            link : '/apps/churches',
            exactMatch: true
          },
          {
            id   : 'churches.attendance-reports',
            title: 'Attendance Records',
            type : 'basic',
            icon    : 'heroicons_outline:clipboard-check',
            link : '/apps/churches/attendance-reports',
            exactMatch: true,
          },
          {
            id      : 'churches.reporting',
            title   : 'Reports',
            type    : 'collapsable',
            icon    : 'heroicons_outline:document-report',
            children: [
              {
                id   : 'churches.reporting.attendance-analytics',
                title: 'Attendance Analytics',
                type : 'basic',
                icon    : 'heroicons_outline:trending-up',
                link : '/apps/churches/reports/attendance-analytics',
                exactMatch: true
              }
            ]
          }
        ]
    },
    {
        id      : 'apps.groups',
        title   : 'Groups',
        type    : 'aside',
        icon    : 'heroicons_outline:view-grid',
        children: [
            {
              id   : 'groups.group-types',
              title: 'Manage Groups Types',
              subtitle: 'View, create & edit groups types',
              type : 'basic',
              icon : 'heroicons_outline:circle-stack',
              link : '/apps/group-types',
              exactMatch: true
            },
            {
                id   : 'groups.group-manager',
                title: 'Manage Groups',
                subtitle: 'View, create & edit groups',
                type : 'basic',
                icon : 'heroicons_outline:view-grid-add',
                link : '/apps/groups',
                exactMatch: true
            },
            {
                id      : 'groups.cell-ministry',
                title   : 'Cell Ministry',
                type    : 'collapsable',
                icon    : 'heroicons_outline:view-boards',
                children: [
                    {
                        id   : 'groups.cell-ministry.dashboard',
                        title: 'Dashboard',
                        type : 'basic',
                        icon : 'heroicons_outline:home',
                        link : '/apps/groups/cell-ministry',
                        exactMatch: true,
                    },
                    {
                        id   : 'groups.cell-ministry.attendance-reports',
                        title: 'Attendance Records',
                        type : 'basic',
                        icon    : 'heroicons_outline:clipboard-check',
                        link : '/apps/groups/cell-ministry/attendance-reports',
                        exactMatch: true,
                    }
                ]
            },
            {
                id      : 'groups.reporting',
                title   : 'Reports',
                type    : 'collapsable',
                icon    : 'heroicons_outline:document-report',
                children: [
                    {
                        id   : 'groups.reporting.attendance-analytics',
                        title: 'Attendance Analytics',
                        type : 'basic',
                        icon    : 'heroicons_outline:trending-up',
                        link : '/apps/groups/reports/attendance-analytics',
                        exactMatch: true
                    }
                ]
            }
        ]
    },
    {
        id   : 'apps.discipleship',
        title: 'Discipleship',
        type : 'basic',
        icon : 'heroicons_outline:view-boards',
        link : '/apps/discipleship',
        exactMatch: true
    },
    {
      id   : 'apps.missions',
      title: 'Missions',
      type : 'aside',
      icon : 'heroicons_outline:support',
      children: [
        {
          id   : 'missions.dashboard',
          title: 'Dashboard',
          subtitle: 'Missions overview',
          type : 'basic',
          icon : 'heroicons_outline:home',
          link : '/apps/missions',
          exactMatch: true
        }
      ]
    },
    {
      id   : 'apps.settings',
      title: 'Settings',
      type : 'aside',
      icon : 'heroicons_outline:adjustments-vertical',
      children: [
        {
          id   : 'settings.home',
          title: 'System settings',
          subtitle: 'View settings',
          type : 'basic',
          icon : 'heroicons_outline:home',
          link : '/apps/reports',
          exactMatch: true
        }
      ]
    },
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
