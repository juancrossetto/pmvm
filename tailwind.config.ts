import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			// ── R3SET Design System ─────────────────────────────────────────
  			'surface-dim': '#0e0e0e',
  			'surface-container-lowest': '#000000',
  			'surface-container-low': '#131313',
  			'surface-container': '#1a1a1a',
  			'surface-container-high': '#20201f',
  			'surface-container-highest': '#262626',
  			'surface-bright': '#2c2c2c',
  			'surface-variant': '#262626',
  			'on-surface': '#ffffff',
  			'on-surface-variant': '#adaaaa',
  			'on-background': '#ffffff',
  			'outline-variant': '#484847',
  			'primary-dim': '#c1ed00',
  			'primary-container': '#cefc22',
  			'primary-fixed': '#cefc22',
  			'primary-fixed-dim': '#c1ed00',
  			'on-primary': '#526700',
  			'on-primary-fixed': '#3b4a00',
  			'on-primary-container': '#4b5e00',
  			'on-primary-fixed-variant': '#546900',
  			'inverse-primary': '#526700',
  			'secondary-dim': '#00d4ec',
  			'secondary-fixed': '#26e6ff',
  			'secondary-fixed-dim': '#00d7f0',
  			'secondary-container': '#006875',
  			'on-secondary': '#004d57',
  			'on-secondary-fixed': '#003a42',
  			'on-secondary-container': '#e8fbff',
  			'on-secondary-fixed-variant': '#005964',
  			'tertiary': '#ff734a',
  			'tertiary-dim': '#ff734a',
  			'tertiary-fixed': '#ff9475',
  			'tertiary-fixed-dim': '#ff7d57',
  			'tertiary-container': '#ff5722',
  			'on-tertiary': '#430c00',
  			'on-tertiary-fixed': '#340800',
  			'on-tertiary-container': '#250400',
  			'on-tertiary-fixed-variant': '#6f1a00',
  			'error-dim': '#d53d18',
  			'error-container': '#b92902',
  			'on-error-container': '#ffd2c8',
  			'inverse-surface': '#fcf9f8',
  			'inverse-on-surface': '#565555',
  			// ────────────────────────────────────────────────────────────────
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
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
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			primaryColor: '#FAD02C',
  			secondaryColor: '#ef8108',
  			grayColor: '#E6C2BF',
  			lightColor: '#F8EFE4',
  			darkColor: '#171717',
  			brand: {
  				black: '#000000',
  				dark: '#0a0a0a',
  				gray: '#141414',
  				accent: '#ffd11e',
  				text: '#e5e5e5',
  			},
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			DEFAULT: '0.125rem',
  			xl: '0.5rem',
  		},
  		fontFamily: {
  			heading: ['var(--font-montserrat)', 'sans-serif'],
  			headline: ['var(--font-space-grotesk)', 'sans-serif'],
  			body: ['var(--font-manrope)', 'sans-serif'],
  			label: ['var(--font-lexend)', 'sans-serif'],
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'slow-bounce': {
  				'0%, 100%': {
  					transform: 'translateY(-25%)',
  					'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)'
  				},
  				'50%': {
  					transform: 'translateY(0)',
  					'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)'
  				}
  			},
  			pulse: {
  				'0%, 100%': {
  					transform: 'scale(1)',
  					opacity: '1'
  				},
  				'50%': {
  					transform: 'scale(1.02)',
  					opacity: '0.7'
  				}
  			},
  			ping: {
  				'75%, 100%': {
  					transform: 'scale(1.3)',
  					opacity: '0'
  				}
  			},
  			moveInSquare: {
  				'0%': {
  					transform: 'translate(0, 0)'
  				},
  				'25%': {
  					transform: 'translate(100px, 0)'
  				},
  				'50%': {
  					transform: 'translate(100px, 100px)'
  				},
  				'75%': {
  					transform: 'translate(0, 100px)'
  				},
  				'100%': {
  					transform: 'translate(0, 0)'
  				}
  			},
  			'slide-up': {
  				'0%': {
  					transform: 'translateY(100%)'
  				},
  				'100%': {
  					transform: 'translateY(-100%)'
  				}
  			},
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'slow-bounce': 'slow-bounce 3s infinite',
  			'ease-in-out': 'transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)',
  			'pulse': 'pulse 5s infinite',
  			'moveInSquare': 'moveInSquare 4s linear infinite',
  			'slide-up': 'slide-up 1s cubic-bezier(0.82, 0.12, 0.8, 0.35) forwards',
  		},
  		transitionDuration: {
  			'450': '450ms',
  			'750': '750ms',
  			'850': '850ms',
  			'950': '950ms'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config