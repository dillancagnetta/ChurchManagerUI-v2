export interface User
{
    userLoginId: string;
    personId: number;
    name: string;
    email: string;
    avatar?: string;
    status?: OnlineStatus;
}

export type OnlineStatus = 'online' | 'offline' | 'away' | 'busy' | 'not-visible' | undefined;
