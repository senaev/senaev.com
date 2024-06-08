import { getObjectEntries } from 'utils/Object/getObjectEntries';
import { getHashFromString } from 'utils/Script/getHashFromString';

import styles from './index.module.css';
import { SENAEV_SITE_URL } from 'const/const';

const GROCCERY: Record<string, string[]> = {
    'How to cook Main Course': [
        'Boil',
        'Fry',
        'Bake',
    ],
    'Main Course': [
        'Beef',
        'Pork',
        'Chicken',
        'Fish',
    ],
    'How to cook Side dish': [
        'boil',
        'fry',
        'bake',
    ],
    'Side dish': [
        'Potatoe',
        'Rice',
        'Buckwheat',
        'Pasta',
    ],
};

export const dynamic = 'force-dynamic';

export default function Page ({ searchParams }: {
    searchParams: Record<string, string>
}): JSX.Element {
    let resultOffset = 0;
    const { offset } = searchParams;
    if (offset !== undefined) {
        if (!Number.isInteger(Number(offset))) {
            throw new Error(`offset=[${offset}] is NOT valid`);
        }

        resultOffset = Number(offset);
    }

    const currentUrl = `${SENAEV_SITE_URL}/fun/what-to-eat-today`;
    const yesterday = new URL(currentUrl);
    yesterday.searchParams.set('offset', String(resultOffset - 1));
    const today = new URL(currentUrl);
    today.searchParams.delete('offset');
    const tomorrow = new URL(currentUrl);
    tomorrow.searchParams.set('offset', String(resultOffset + 1));

    const date = new Date();
    date.setDate(date.getDate() + resultOffset);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const todayString = `${year}-${month}-${day}`;
    const hash = String(Math.abs(getHashFromString(todayString))).padStart(Object.keys(GROCCERY).length, String(day)[0]).split('').reverse();

    const randoms = getObjectEntries(GROCCERY).map(([name, arr], i) => {
        const initialNumber = Number(hash[i]);
        const index = initialNumber % arr.length;

        return [name, arr[index]];
    });

    return (
        <div className={styles.Container}>
            <div className={styles.ServiceInfo}>
                <a href={yesterday.toString()}>
                    Yesterday
                </a>
                <div>
                    <a href={today.toString()}>Today</a>: {todayString}
                </div>
                <a href={tomorrow.toString()}>
                    Tomorrow
                </a>
                <div>
                Hash: {hash.join('')}
                </div>
                <div>
                We are eating: {JSON.stringify(randoms)}
                </div>
            </div>
            <div className={styles.MainInfo}>
                <div>
                    {`${randoms[0]![1]} ${randoms[1]![1]} and ${randoms[2]![1]} ${randoms[3]![1]}`}
                </div>
            </div>
        </div>
    );
}
