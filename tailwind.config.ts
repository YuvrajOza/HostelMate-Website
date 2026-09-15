import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: 'class',
    content: [
        './app/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#eef2ff',
                    100: '#e0e7ff',
                    200: '#c7d2fe',
                    300: '#a5b4fc',
                    400: '#818cf8',
                    500: '#6366f1',
                    600: '#4f46e5',
                    700: '#4338ca',
                    800: '#3730a3',
                    900: '#312e81',
                },
                surface: {
                    light: '#F8FAFC',
                    card: '#FFFFFF',
                    border: '#E2E8F0',
                    dark: '#0B1220',
                    cardDark: '#111A2E',
                    borderDark: '#1F2A44',
                },
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                soft: '0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -12px rgba(15, 23, 42, 0.08)',
                card: '0 1px 3px rgba(15, 23, 42, 0.06), 0 12px 32px -16px rgba(15, 23, 42, 0.12)',
            },
        },
    },
    plugins: [],
};

export default config;