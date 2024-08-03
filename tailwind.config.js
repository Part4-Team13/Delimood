/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}', './index.html'],
  theme: {
    screens: {
      tablet: '744px',
      desktop: '1280px',
    },
    fontSize: {
      '4xl': ['40px', '52px'],
      '3xl': ['32px', '42px'], // font-paraph : ["32px", "48px"]
      '2xl': ['24px', '32px'], // font-paraph : ["24px", "48px"]
      xl: ['20px', '32px'], // font-paraph : ["20px", "28px"]
      '2lg': ['18px', '26px'],
      lg: ['16px', '26px'], // font-bold/semibold : ["16px", "24px"]
      md: ['14px', '24px'],
      sm: ['13px', '22px'],
      xs: ['12px', '18px'], // font-semibold : ["12px", "20px"]
    },
    colors: {
      background: '#F5F7FA',
      state: {
        alert: '#FF6577',
      },
      line: {
        bright: '#F2F2F2',
        darker: '#CFDBEA',
      },
      button: {
        default: '#454545',
        hover: '#373737',
        click: '#2B2B2B',
        diabled: '#CBD3E1',
      },
      insert: '#050505',
      black: {
        100: '#F9F9F9',
        200: '#6B6B6B',
        300: '#5E5E5E',
        400: '#525252',
        500: '#454545',
        600: '#373737',
      },
      blue: {
        200: '#ECEFF4',
        300: '#CBD3E1',
        400: '#ABB8CE',
        500: '#8B9DBC',
        600: '#6A82A9',
        700: '#52698E',
        800: '#40516E',
        900: '#2D394E',
        950: '#1A212D',
        default: '#5195EE',
      },
      gray: {
        100: '#DEDEDE',
        200: '#C4C4C4',
        300: '#ABABAB',
        400: '#919191',
      },
      white: '#FFFFFF',
      yellow: '#FBC85B',
      orange: '#E8AA26',
      green: '#48BB98',
      purple: '#8E80E3',
      red: '#E46E80',
      brown: '#9A695E',
    },
    extend: {
      fontFamily: {
        // 기본 폰트 : Pretendard
        paraph: 'Iropke Batang',
      },
    },
  },
};
