import { Merriweather } from 'next/font/google';

// Font from vas3k website
const merriweather = Merriweather({
    subsets: ['latin'],
    weight: [
        '300',
        '400',
        '700',
        '900',
    ], // Add the weights you need
    style: [
        'normal',
        'italic',
    ], // Add styles if needed
    display: 'swap', // Improves loading performance
});

export const fontMerriweatherClassname = merriweather.className;
