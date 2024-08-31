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
  		center: 'true',
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
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
  			darkColor: '#171717'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
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
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'slow-bounce': 'slow-bounce 3s infinite',
  			'ease-in-out': 'transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)',
  			'pulse': 'pulse 5s infinite',
  			'moveInSquare': 'moveInSquare 4s linear infinite',
  			'slide-up': 'slide-up 1s cubic-bezier(0.82, 0.12, 0.8, 0.35) forwards',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
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