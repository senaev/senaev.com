import classNames from 'classnames';
import { Merriweather } from 'next/font/google';
import styles from './index.module.css';

// Font from vas3k website
const font = Merriweather({
    subsets: [
        'cyrillic',
        'latin',
    ],
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
    fallback: [
        'Georgia',
        'Times',
        'serif',
    ],
});

export const FONT_MERRIWEATHER_CLASSNAMES = classNames(
    font.className,
    styles.FONT_MERRIWEATHER_CLASSNAME
);
