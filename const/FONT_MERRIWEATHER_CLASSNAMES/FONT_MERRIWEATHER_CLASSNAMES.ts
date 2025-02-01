import classNames from 'classnames';
import { Merriweather } from 'next/font/google';
import styles from './index.module.css';

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

export const FONT_MERRIWEATHER_CLASSNAMES = classNames(
    merriweather.className,
    styles.FONT_MERRIWEATHER_CLASSNAME
);
