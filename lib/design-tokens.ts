export const colors = {
  goldStart: '#FCE688',
  goldMid: '#D1A736',
  goldEnd: '#946E18',
  goldFocus: '#C49D32',
  bg: '#000B03',
  dark600: '#1B1B1B',
  dark500: '#1E1E1E',
  dark400: '#4B4B4B',
  dark300: '#686868',
  dark200: '#989898',
  dark100: '#B9B9B9',
  white: '#FFFFFF',
  danger: '#DC2626',
  success: '#16A34A',
} as const;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
} as const;

export const radius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  full: '9999px',
} as const;

export const typography = {
  fontFamily: 'Helvetica Neue, Arial, sans-serif',
  sizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '24px',
    '2xl': '32px',
    hero: '33px',
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;
