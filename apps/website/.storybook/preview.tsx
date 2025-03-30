import type { Preview } from '@storybook/react';
import { SettingsProvider } from '../src/components/settings';
import { LocalizationProvider } from '../src/locales';
import ThemeProvider from '../src/theme';

export const decorators: Preview['decorators'] = [
  (Story, context) => {
    const { themeMode, themeDirection, themeContrast, themeLayout, themeColorPresets, themeStretch } = context.globals;

    return (
      <LocalizationProvider>
        <SettingsProvider
          defaultSettings={{
            themeMode: themeMode || 'light',
            themeDirection: themeDirection || 'ltr',
            themeContrast: themeContrast || 'default',
            themeLayout: themeLayout || 'vertical',
            themeColorPresets: themeColorPresets || 'default',
            themeStretch: themeStretch || false,
          }}
        >
          <ThemeProvider>
            <Story />
          </ThemeProvider>
        </SettingsProvider>
      </LocalizationProvider>
    );
  },
];

export const globalTypes = {
  themeMode: {
    name: 'Theme Mode',
    description: 'Switch between light and dark mode',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
      showName: true,
    },
  },
  themeDirection: {
    name: 'Direction',
    description: 'Text direction',
    defaultValue: 'ltr',
    toolbar: {
      icon: 'paragraph',
      items: [
        { value: 'ltr', title: 'LTR' },
        { value: 'rtl', title: 'RTL' },
      ],
      showName: true,
    },
  },
  themeContrast: {
    name: 'Contrast',
    description: 'Theme contrast level',
    defaultValue: 'default',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'default', title: 'Default' },
        { value: 'bold', title: 'Bold' },
      ],
      showName: true,
    },
  },
  themeLayout: {
    name: 'Layout',
    description: 'Layout orientation',
    defaultValue: 'vertical',
    toolbar: {
      icon: 'sidebar',
      items: [
        { value: 'vertical', title: 'Vertical' },
        { value: 'horizontal', title: 'Horizontal' },
        { value: 'mini', title: 'Mini' },
      ],
      showName: true,
    },
  },
  themeColorPresets: {
    name: 'Color Preset',
    description: 'Theme color scheme',
    defaultValue: 'default',
    toolbar: {
      icon: 'component',
      items: [
        { value: 'default', title: 'Default' },
        { value: 'cyan', title: 'Cyan' },
        { value: 'purple', title: 'Purple' },
        { value: 'blue', title: 'Blue' },
        { value: 'orange', title: 'Orange' },
        { value: 'red', title: 'Red' },
      ],
      showName: true,
    },
  },
  themeStretch: {
    name: 'Stretch',
    description: 'Stretch layout',
    defaultValue: false,
    toolbar: {
      icon: 'grow',
      items: [
        { value: false, title: 'Fixed' },
        { value: true, title: 'Stretched' },
      ],
      showName: true,
    },
  },
};

export const parameters: Preview['parameters'] = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
};
