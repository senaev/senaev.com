import classNames from 'classnames';
import { Ubuntu } from 'next/font/google';
import styles from './index.module.css';

// Font from vas3k website
const merriweather = Ubuntu({
    subsets: [
        'cyrillic',
        'latin',
    ],
    weight: [
        '300',
        '400',
        '500',
        '700',
    ], // Add the weights you need
    style: [
        'normal',
        'italic',
    ], // Add styles if needed
    display: 'swap', // Improves loading performance
    fallback: [
        'Helvetica',
        'Verdana',
        'sans-serif',
    ],
});

export const FONT_UBUNTU_CLASSNAMES = classNames(
    styles.FONT_UBUNTU_CLASSNAME,
    merriweather.className
);
