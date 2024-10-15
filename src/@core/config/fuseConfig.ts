import { Layout } from 'app/ui/layout/layout.types';

// Types
export type Scheme = 'auto' | 'dark' | 'light';
export type Screens = { [key: string]: string };
export type Theme = 'theme-default' | string;
export type Themes = { id: string; name: string }[];

/**
 * AppConfig interface. Update this interface to strictly type your config
 * object.
 */
export interface FuseConfig
{
    layout: string;
    scheme: Scheme;
    screens: Screens;
    theme: Theme;
    themes: Themes;
}

/**
 * Default configuration for the entire application. This object is used by
 * FuseConfigService to set the default configuration.
 *
 * If you need to store global configuration for your app, you can use this
 * object to set the defaults. To access, update and reset the config, use
 * FuseConfigService and its methods.
 */
export const appConfig: FuseConfig = {
    layout: 'compact',
    scheme: 'light',
    theme : 'default',
    screens: {
        sm: '600px',
        md: '960px',
        lg: '1280px',
        xl: '1440px',
    },
    themes: [
        {
            id: 'default',
            name: 'Default',
        },
    ]
};
