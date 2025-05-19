/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{html,ts,scss}',
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          border: 'hsl(var(--border) / <alpha-value>)',
          input: 'hsl(var(--input) / <alpha-value>)',
          background: 'hsl(var(--background) / <alpha-value>)',
          foreground: 'hsl(var(--foreground) / <alpha-value>)',

          primary: {
            DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
            foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
          },

          muted: {
            DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
            foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
          },

          card: {
            DEFAULT: 'hsl(var(--card) / <alpha-value>)',
            foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
          },

          /* ─── custom colors ────────────────────────────── */
          gold: 'hsl(var(--gold) / <alpha-value>)',
          'gold-darker':'hsl(var(--gold-darker) / <alpha-value>)',
        },

        borderRadius: {
          lg: 'var(--radius)',
          md: 'calc(var(--radius) - 2px)',
          sm: 'calc(var(--radius) - 4px)',
        },
      },
    },
    plugins: [],
  };
