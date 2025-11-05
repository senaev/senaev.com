'use client';

import type { JSX } from 'react';
import styles from './PrintButton.module.css';

export function PrintButton(): JSX.Element {
    return <span
        className={styles.PrintButton}
        onClick={() => {
            window.print();
        }}
    >
        {'Print 🖨️'}
    </span>;
}
