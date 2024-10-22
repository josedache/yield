/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: "#app",
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          main: "var(--mui-palette-primary-main)",
          light: "var(--mui-palette-primary-light)",
          lighter: "var(--mui-palette-primary-lighter)",
          dark: "var(--mui-palette-primary-dark)",
          darker: "var(--mui-palette-primary-darker)",
          contrastText: "var(--mui-palette-primary-contrastText)",
          50: "var(--mui-palette-primary-50)",
          100: "var(--mui-palette-primary-100)",
          200: "var(--mui-palette-primary-200)",
          300: "var(--mui-palette-primary-300)",
          400: "var(--mui-palette-primary-400)",
          500: "var(--mui-palette-primary-500)",
          600: "var(--mui-palette-primary-600)",
          700: "var(--mui-palette-primary-700)",
          800: "var(--mui-palette-primary-800)",
          900: "var(--mui-palette-primary-900)",
        },
        secondary: {
          main: "var(--mui-palette-secondary-main)",
          light: "var(--mui-palette-secondary-light)",
          lighter: "var(--mui-palette-secondary-lighter)",
          dark: "var(--mui-palette-secondary-dark)",
          darker: "var(--mui-palette-secondary-darker)",
          contrastText: "var(--mui-palette-secondary-contrastText)",
          50: "var(--mui-palette-secondary-50)",
          100: "var(--mui-palette-secondary-100)",
          200: "var(--mui-palette-secondary-200)",
          300: "var(--mui-palette-secondary-300)",
          400: "var(--mui-palette-secondary-400)",
          500: "var(--mui-palette-secondary-500)",
          600: "var(--mui-palette-secondary-600)",
          700: "var(--mui-palette-secondary-700)",
          800: "var(--mui-palette-secondary-800)",
          900: "var(--mui-palette-secondary-900)",
        },
        success: {
          main: "var(--mui-palette-success-main)",
          light: "var(--mui-palette-success-light)",
          lighter: "var(--mui-palette-success-lighter)",
          dark: "var(--mui-palette-success-dark)",
          contrastText: "var(--mui-palette-success-contrastText)",
          50: "var(--mui-palette-success-50)",
          100: "var(--mui-palette-success-100)",
          200: "var(--mui-palette-success-200)",
          300: "var(--mui-palette-success-300)",
          400: "var(--mui-palette-success-400)",
          500: "var(--mui-palette-success-500)",
          600: "var(--mui-palette-success-600)",
          700: "var(--mui-palette-success-700)",
          800: "var(--mui-palette-success-800)",
          900: "var(--mui-palette-success-900)",
        },
        info: {
          main: "var(--mui-palette-info-main)",
          light: "var(--mui-palette-info-light)",
          lighter: "var(--mui-palette-info-lighter)",
          dark: "var(--mui-palette-info-dark)",
          contrastText: "var(--mui-palette-info-contrastText)",
          50: "var(--mui-palette-info-50)",
          100: "var(--mui-palette-info-100)",
          200: "var(--mui-palette-info-200)",
          300: "var(--mui-palette-info-300)",
          400: "var(--mui-palette-info-400)",
          500: "var(--mui-palette-info-500)",
          600: "var(--mui-palette-info-600)",
          700: "var(--mui-palette-info-700)",
          800: "var(--mui-palette-info-800)",
          900: "var(--mui-palette-info-900)",
        },
        warning: {
          main: "var(--mui-palette-warning-main)",
          light: "var(--mui-palette-warning-light)",
          lighter: "var(--mui-palette-warning-lighter)",
          dark: "var(--mui-palette-warning-dark)",
          contrastText: "var(--mui-palette-warning-contrastText)",
          50: "var(--mui-palette-warning-50)",
          100: "var(--mui-palette-warning-100)",
          200: "var(--mui-palette-warning-200)",
          300: "var(--mui-palette-warning-300)",
          400: "var(--mui-palette-warning-400)",
          500: "var(--mui-palette-warning-500)",
          600: "var(--mui-palette-warning-600)",
          700: "var(--mui-palette-warning-700)",
          800: "var(--mui-palette-warning-800)",
          900: "var(--mui-palette-warning-900)",
        },
        error: {
          main: "var(--mui-palette-error-main)",
          light: "var(--mui-palette-error-light)",
          lighter: "var(--mui-palette-error-lighter)",
          dark: "var(--mui-palette-error-dark)",
          contrastText: "var(--mui-palette-error-contrastText)",
          50: "var(--mui-palette-error-50)",
          100: "var(--mui-palette-error-100)",
          200: "var(--mui-palette-error-200)",
          300: "var(--mui-palette-error-300)",
          400: "var(--mui-palette-error-400)",
          500: "var(--mui-palette-error-500)",
          600: "var(--mui-palette-error-600)",
          700: "var(--mui-palette-error-700)",
          800: "var(--mui-palette-error-800)",
          900: "var(--mui-palette-error-900)",
        },
        common: {
          black: "var(--mui-palette-common-black)",
          white: "var(--mui-palette-common-white)",
        },
        text: {
          primary: "var(--mui-palette-text-primary)",
          secondary: "var(--mui-palette-text-secondary)",
          disabled: "var(--mui-palette-text-disabled)",
        },
        background: {
          paper: "var(--mui-palette-background-paper)",
          default: "var(--mui-palette-background-default)",
        },
        action: {
          active: "var(--mui-palette-action-active)",
          hover: "var(--mui-palette-action-hover)",
          selected: "var(--mui-palette-action-selected)",
          disabled: "var(--mui-palette-action-disabled)",
          disabledBackground: "var(--mui-palette-action-disabledBackground)",
          focus: "var(--mui-palette-action-focus)",
        },
        border: {
          DEFAULT: "#E5E7EB",
        },
      },
      fontFamily: {
        inherit: ["inherit"],
        inter: [
          "Inter",
          "sans-serif",
          "-apple-system",
          "BlinkMacSystemFont",
          "Ubuntu",
        ],
      },
      zIndex: {
        mobileStepper: "var(--mui-zIndex-mobileStepper)",
        fab: "var(--mui-zIndex-fab)",
        speedDial: "var(--mui-zIndex-speedDial)",
        appBar: "var(--mui-zIndex-appBar)",
        drawer: "var(--mui-zIndex-drawer)",
        modal: "var(--mui-zIndex-modal)",
        snackbar: "var(--mui-zIndex-snackbar)",
        tooltip: "var(--mui-zIndex-tooltip)",
      },
    },
  },
  plugins: [],
};
