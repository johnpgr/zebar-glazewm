export default {
  theme: {
    extend: {
      colors: {
        'main': 'var(--main-color)',
        'bg': 'var(--background-color)',
        'font': 'var(--font-color)',
      },
      fontFamily: {
        'mono': ['"FiraMono Nerd Font Mono"', 'monospace'],
      },
      backdropFilter: {
        'invert': 'invert(1)',
      },
      fontSize: {
        'icon-sm': '7px',
        'xs': '10px',
        'sm': '12px',
      },
      spacing: {
        '0.25vw': '0.25vw',
        '0.5vw': '0.5vw',
        '0.5em': '0.5em',
        '1em': '1em',
      },
    },
  },
}