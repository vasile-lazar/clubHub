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
          orange: 'var(--text-orange)',
          inverse: 'var(--text-inverse)',
          placeholder: 'var(--text-placeholder)',
          link: 'var(--text-link)',
          linkHover: 'var(--text-link-hover)',
          warning: 'var(--text-warning)',
        },
        button: {
          primary: 'var(--btn-primary-bg)',
          primaryHover: 'var(--btn-primary-hover)',
          primaryDisabled: 'var(--btn-disabled-bg)',
          secondary: 'var(--btn-secondary-bg)',
          secondaryHover: 'var(--btn-secondary-hover)',
          textPrimary: 'var(--btn-primary-text)',
          textSecondary: 'var(--btn-secondary-text)',
        },
        input: {
          border: 'var(--input-border)',
          focus: 'var(--input-focus)',
        },
        border: {
          default: 'var(--border-default)',
          strong: 'var(--border-strong)',
        },
        brand: {
          blue: 'var(--brand-blue)',
          blueDark: 'var(--brand-blue-dark)',
          orange: 'var(--brand-orange)',
          orangeDark: 'var(--brand-orange-dark)',
        },
        toast: {
          success: 'var(--toast-success)',
          successBorder: 'var(--toast-success-border)',
          error: 'var(--toast-error)',
          errorBorder: 'var(--toast-error-border)',
          warning: 'var(--toast-warning)',
          warningBorder: 'var(--toast-warning-border)',
          info: 'var(--toast-info)',
          infoBorder: 'var(--toast-info-border)',
        },
        danger: {
          DEFAULT: 'var(--danger-bg)',
          hover: 'var(--danger-hover)',
        },
        inputError: 'var(--input-error)',
        admin: {
          accent: 'var(--admin-accent)',
          accentLight: 'var(--admin-accent-light)',
          accentBorder: 'var(--admin-accent-border)',
        },
        stat: {
          blue: 'var(--stat-blue)',
          green: 'var(--stat-green)',
          amber: 'var(--stat-amber)',
        },
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
      },
    },
  },
  plugins: [],
};
