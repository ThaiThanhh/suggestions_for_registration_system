/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: ['./views/**/*.hbs'],
    theme: {
        extend: {
            fontFamily: {
                inter: ['Inter', 'san-serif'],
            },
            colors: {
                primary: '#1577C2',
            },
        },
    },
    plugins: [],
};
