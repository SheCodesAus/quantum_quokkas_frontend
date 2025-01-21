/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'pink-light': '#FFC0CB',
                'pink-dark': '#F7838C',
                'blue-light': '#5CE1E6',
                'blue-dark': '#38B6FF',
                'green-light': '#C0FF72',
                'green-dark': '#7ED956',
                'purple-light': '#C8B3EE',
                'purple-dark': '#A16AE9',
                'yellow-light': '#FFEB5C',
                'yellow-dark': '#E1B808',
                'orange-light': '#FFC969',
                'orange-dark': '#FF8110',
                'red-light': '#F67264',
                'red-dark': '#C4391D',
            },
            fontFamily: {
                'main': ['Inter'],
                'accent': ['Shadows Into Light Two'],
                'note': ['Indie Flower'],
            },
            backgroundImage: {
                'hero' : "url('/note-icons/purple.png')",
                'note' : "url('/note-icons/pink-blank.png')",
            }
        },
    },
    plugins: [],
};
