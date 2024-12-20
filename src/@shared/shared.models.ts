import {HttpHeaders} from '@angular/common/http';
import {OnlineStatus} from "@core/user/user.model";

export interface ApiResponse
{
    succeeded: boolean;
    message?: any;
    errors?: any;
    data?: any;
}

export interface Identifiable
{
    id: string | number;
    label: string;
}

export declare type Autocompletes = Identifiable[];

export interface SelectItem {
    id: string | number;
    name: string;
}

export interface UserDetails {
    personId: number;
    username?: string;
    userLoginId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    photoUrl?: string;
}

export interface DialogData<T> {
    data: T;
}

export declare type OnlineUsers = OnlineUser[];
export interface OnlineUser
{
    id: string;  // userLoginId
    name: string;
    avatar?: string; // photoUrl
    status: OnlineStatus;
    unread?: number;
    lastOnline?: Date;
}

export class OnlineUserModel implements OnlineUser
{
    id: string;  // userLoginId
    name: string;
    avatar?: string; // photoUrl
    status: OnlineStatus;
    unread?: number;
    lastOnline?: Date;

    constructor(model: Partial<OnlineUser>)
    {
        this.id = model.id;
        this.name = model.name;
        this.avatar = model.avatar  || 'assets/images/avatars/profile-blank.jpg';
        this.status = model.status;
        this.unread = model.unread;
        this.lastOnline = model.lastOnline;
    }
}

export type FormAction = FormActions.New | FormActions.Edit;

export enum FormActions
{
    New = 'new',
    Edit = 'edit'
}

export enum ButtonActions
{
  Add = 'add',
  Edit = 'edit',
  Delete = 'delete'
}


export enum PeriodTypes
{
    Today = 10,
    Yesterday = 20,
    ThisWeek = 30,
    LastWeek = 40,
    ThisMonth = 50,
    LastMonth = 60,
    ThisYear = 70,
    AllTime = 100
}


/**
* Errors
*/

export interface Errors {
    name?: string[];
}

export interface Error {
    type?: string;
    title?: string;
    status?: number;
    traceId?: string;
    errors?: Errors;
}

export interface CmHttpErrorResponse
{
    headers: HttpHeaders;
    status?: number;
    statusText?: string;
    url?: string;
    ok?: boolean;
    message?: string;
    error?: Error;
}

export interface BasicPerson {
  personId: number;
  firstName: string;
  lastName: string;
  gender: "Male" | "Female" | "Unknown";
  ageClassification: string;
  photoUrl: string | null;
  age: number | null;
}