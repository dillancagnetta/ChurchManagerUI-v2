import { Person } from '../people';
import { Moment } from 'moment';
import { Identifiable } from '@shared/shared.models';

export interface Group {
    groupId: number;
    name: string;
    description: string;
    parentGroupId?: any;
    groupType: GroupType;
    members: GroupMember[];
    recordStatus: string;
}

export interface GroupType {
    id?: number;
    name: string;
    description: string;
    groupTerm?: string;
    groupMemberTerm?: string;
    takesAttendance: boolean;
    isSystem: boolean;
    iconCssClass?: any;
}

export interface GroupMemberRole {
    id: number;
    name: string;
    description: string;
    isLeader: boolean;
}

export interface GroupMember {
    id: number;
    groupId: number;
    personId: number;
    groupMemberRoleId: number;
    archiveStatus?: any;
    communicationPreference: string;
    group?: Group;
    groupMemberRole: GroupMemberRole;
    person: Person;
    recordStatus: string;
    inactiveDateTime?: any;
}

export interface GroupSummary
{
    groupId: number;
    name: string;
    description: string;
    parentGroupId?: any;
    groupType: string;
    recordStatus: string;
    membersCount: number;
}

export interface GroupMemberSimple
{
    groupId: number;
    groupMemberId: number;
    personId: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    gender: string;
    photoUrl: string;
    groupMemberRole?: string;
    groupMemberRoleId?: number;
    isLeader?: boolean;
    firstVisitDate?: Date;
    recordStatus: string;
}

export type GroupMembersSimple = GroupMemberSimple[];

export interface GroupWithChildren
{
    id: number;
    churchId: number;
    parentGroupId?: any;
    parentGroupName?: string;
    groupType: GroupType;
    name: string;
    description: string;
    address?: any;
    startDate?: Date;
    isOnline: boolean;
    createdDate: Date;
    groups?: GroupWithChildren[];
}

export interface GroupTypeRole
{
    id?: number;
    name: string;
    description: string;
    isLeader: boolean;
    canView?: boolean;
    canEdit?: boolean;
    canManageMembers?: boolean;
    groupTypeId?: number;
}

export interface NewGroupMemberForm
{
    person: Identifiable;
    groupRole: number;
    communicationPreference?: string;
    firstVisitDate?: Moment;

    groupId?: number;
}
