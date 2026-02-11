/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          surface: 'var(--bg-surface)',
          overlay: 'var(--bg-overlay)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          inverse: 'var(--text-inverse)',
          placeholder: 'var(--text-placeholder)',
          link: 'var(--text-link)',
          linkHover: 'var(--text-link-hover)',
        },
        button: {
          primary: 'var(--btn-primary-bg)',
          primaryHover: 'var(--btn-primary-hover)',
          primaryDisabled: 'var(--btn-disabled-bg)',
          secondary: 'var(--btn-secondary-bg)',
          secondaryHover: 'var(--btn-secondary-hover)',
        },
        input: {
          border: 'var(--input-border)',
          focus: 'var(--input-focus)',
        },
        border: {
          default: 'var(--border-default)',
        },
        shadow: {
          sm: 'var(--shadow-sm)',
          md: 'var(--shadow-md)',
        },
        brand: {
          blue: 'var(--brand-blue)',
          blueDark: 'var(--brand-blue-dark)',
          orange: 'var(--brand-orange)',
          orangeDark: 'var(--brand-orange-dark)',
        },
      },
    },
  },
  plugins: [],
};
