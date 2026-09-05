import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: { DEFAULT: '1.5rem', lg: '2.5rem' },
			screens: {
				'2xl': '1320px'
			}
		},
		extend: {
			fontFamily: {
				// Body & UI. Inter carries small text and metadata.
				sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				// Headlines. Fraunces is a variable serif — warm, contemporary,
				// with optical sizing so large settings stay elegant.
				display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				'border-strong': 'hsl(var(--border-strong))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				surface: {
					DEFAULT: 'hsl(var(--surface))',
					deep: 'hsl(var(--surface-deep))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					soft: 'hsl(var(--primary-soft))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				night: {
					DEFAULT: 'hsl(var(--night))',
					foreground: 'hsl(var(--night-foreground))'
				},
				saffron: 'hsl(var(--saffron))',
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 1px)',
				sm: 'calc(var(--radius) - 1px)'
			},
			fontSize: {
				// Editorial display scale — tight leading at large sizes
				'display-sm': ['clamp(1.75rem, 1.2rem + 2.4vw, 2.75rem)', { lineHeight: '1.1' }],
				'display-md': ['clamp(2.25rem, 1.4rem + 3.6vw, 4rem)', { lineHeight: '1.05' }],
				'display-lg': ['clamp(2.75rem, 1.5rem + 5.2vw, 5.5rem)', { lineHeight: '0.98' }],
			},
			boxShadow: {
				lift: 'var(--shadow-lift)'
			},
			transitionTimingFunction: {
				'out-soft': 'cubic-bezier(0.22, 1, 0.36, 1)'
			},
			keyframes: {
				'fade-up': {
					from: { opacity: '0', transform: 'translateY(1rem)' },
					to: { opacity: '1', transform: 'none' }
				},
				'ken-burns': {
					from: { transform: 'scale(1)' },
					to: { transform: 'scale(1.06)' }
				}
			},
			animation: {
				'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
				'ken-burns': 'ken-burns 18s ease-out forwards'
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
