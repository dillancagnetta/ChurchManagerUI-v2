export enum ClaimType
{
    Sub = '',
    Roles = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
}

export interface Credentials {
    username: string;
    password: string;
    tenant?: string
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

export type AuthState = {
    isAuthenticated: boolean;
    accessToken?: string;
    tenants: string[];
    selectedTenant?: string;
};

export const authInitialState: AuthState = {
    isAuthenticated: false,
    accessToken: null,
    tenants: [],
    selectedTenant: null,
};