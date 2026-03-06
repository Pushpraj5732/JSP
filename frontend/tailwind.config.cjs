/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2563EB', // Medical Blue
                    light: '#3B82F6',
                    dark: '#1D4ED8',
                    subtle: '#EFF6FF',
                },
                secondary: {
                    DEFAULT: '#10B981', // Healing Emerald
                    light: '#34D399',
                    dark: '#059669',
                    subtle: '#ECFDF5',
                },
                accent: {
                    DEFAULT: '#F59E0B', // Amber
                    light: '#FBBF24',
                    dark: '#D97706',
                    subtle: '#FFFBEB',
                },
                danger: {
                    DEFAULT: '#EF4444',
                    light: '#F87171',
                    subtle: '#FEF2F2',
                },
                surface: {
                    DEFAULT: '#FFFFFF',
                    alt: '#F8FAFC',
                    dark: '#0F172A',
                },
                dark: {
                    DEFAULT: '#0F172A', // Deep Slate
                    muted: '#334155',
                },
                txt: {
                    primary: '#0F172A',
                    body: '#334155',
                    muted: '#64748B',
                    inverse: '#FFFFFF',
                },
                border: {
                    DEFAULT: '#E2E6ED',
                    dark: '#CBD2DC',
                },
            },
            fontFamily: {
                heading: ['"Plus Jakarta Sans"', 'sans-serif'],
                body: ['"Nunito"', 'sans-serif'],
                mono: ['"IBM Plex Mono"', 'monospace'],
            },
            boxShadow: {
                'card': '0 2px 12px rgba(15, 23, 42, 0.04)',
                'card-hover': '0 12px 24px rgba(15, 23, 42, 0.08)',
                'btn': '0 4px 12px rgba(37, 99, 235, 0.25)',
                'popup': '0 8px 32px rgba(15, 23, 42, 0.1)',
                'focus': '0 0 0 3px rgba(37, 99, 235, 0.15)',
            },
            borderRadius: {
                sm: '4px',
                DEFAULT: '8px',
                lg: '10px',
                xl: '12px',
                '2xl': '16px',
                full: '9999px',
            },
            animation: {
                'fade-up': 'fadeUp 0.3s ease forwards',
                'fade-in': 'fadeIn 0.4s ease forwards',
                'pulse-ring': 'pulseRing 1.4s infinite',
                'slide-up': 'slideUp 0.35s cubic-bezier(0.16,1,0.3,1) forwards',
            },
            keyframes: {
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(16px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                pulseRing: {
                    '0%': { transform: 'scale(1)', opacity: '1' },
                    '50%': { transform: 'scale(1.15)', opacity: '0.6' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(24px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
}
