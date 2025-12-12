/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Rajdhani', 'sans-serif'],
                mono: ['Orbitron', 'monospace'],
            },
            colors: {
                space: {
                    950: '#000000',
                    900: '#050505',
                    800: '#0B0B14',
                    light: '#2A2A40',
                },
                cyan: {
                    400: '#22d3ee',
                    500: '#06b6d4',
                    glow: '#00f7ff',
                }
            },
            animation: {
                'spin-slow': 'spin 60s linear infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}

