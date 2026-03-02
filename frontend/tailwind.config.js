/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                forest: {
                    light: '#4D7C58',
                    DEFAULT: '#3D6B47',
                    dark: '#1C2B1E',
                    deep: '#0F1A10',
                },
                terracotta: {
                    light: '#A07452',
                    DEFAULT: '#8B5E3C',
                    dark: '#6F4B30',
                },
                turmeric: {
                    light: '#D4B86A',
                    DEFAULT: '#C9A84C',
                    dark: '#B09340',
                },
                parchment: {
                    light: '#FCFAF7',
                    DEFAULT: '#F7F3EE',
                    dark: '#EDE7DD',
                    accent: '#E5DED3',
                },
                text: {
                    primary: '#2C2520',
                    secondary: '#5C5147',
                    inverse: '#F7F3EE',
                },
                border: '#D8CFC4',
                success: '#3D6B47',
                alert: '#9B4432',
            },
            fontFamily: {
                serif: ['"Cormorant Garamond"', 'serif'],
                sans: ['"DM Sans"', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            backgroundImage: {
                'grain-overlay': 'url("https://www.transparenttextures.com/patterns/natural-paper.png")',
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
                '26': '6.5rem',
                '30': '7.5rem',
            },
            borderRadius: {
                'organic': '2rem 1rem 3rem 1.5rem',
                'editorial': '0.5rem 2rem 0.5rem 2rem',
            },
            animation: {
                'fade-up-slow': 'fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'fade-in': 'fadeIn 1.5s ease-out forwards',
                'float': 'float 8s ease-in-out infinite',
                'draw': 'draw 2s ease-out forwards',
            },
            keyframes: {
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(40px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            },
        },
    },
    plugins: [],
}
