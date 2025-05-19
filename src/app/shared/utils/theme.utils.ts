export function themeLogo(theme: string): string {
    const darkMode =
        theme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
        : theme === 'dark';

        return darkMode
            ? '/logo_aeon_whitemode.svg'
            : '/logo_aeon_darkmode.svg';
}
