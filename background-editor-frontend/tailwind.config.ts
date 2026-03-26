import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#212121',
        secondary: '#656F77',
        lightGray: '#E7EEEF',
        white: '#FFFFFF',
        darkGray: '#515151',
        icon: '#898989',
        border: '#D3D3D3',
        disabledDark: '#DEDEDE',
        disabledLight: '#F2F5F9',
        error: '#EA6161',
        success: '#43AF7A',
        warning: '#EBAC0C'
      },
      fontFamily: {
        furore: ['Furore', 'serif'],
        golos: ['Golos_Text', 'serif']
      },
      fontSize: {
        // Furore
        'h1-furore': ['78px', '90px'],
        'h2-furore': ['40px', '46px'],
        'h3-furore': ['24px', '28px'],
        'h4-furore': ['20px', '24px'],

        // Golos text
        'h1-golos': ['32px', '140%'],
        'h2-golos': ['24px', '140%'],
        'h3-golos': ['20px', '140%'],
        'body-18px': ['18px', '140%'],
        'body-14px': ['14px', '140%'],
        'body-12px': ['12px', '18px'],
        'body-10px': ['10px', '12px']
      },
      screens: {
        xs: '320px', // маленькие мобильные (iPhone SE, старые Android)
        sm: '375px', // стандартные мобильные (iPhone XR, Galaxy S20)
        md: '768px', // планшеты (iPad, iPad Mini)
        lg: '1024px', // небольшие ноутбуки (MacBook Air, старые десктопы)
        xl: '1280px', // стандартные десктопы (Full HD экраны)
        '2xl': '1440px', // большие мониторы (2K, iMac 27'')
        '3xl': '1920px', // Full HD мониторы (геймерские, большие рабочие)
        '4xl': '2560px', // 2K мониторы, ультраширокие экраны
        '5xl': '3840px' // 4K экраны
      }
    }
  },
  plugins: []
} satisfies Config;
