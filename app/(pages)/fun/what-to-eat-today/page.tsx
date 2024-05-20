import { getObjectEntries } from 'utils/Object/getObjectEntries';
import { getHashFromString } from 'utils/Script/getHashFromString';

import styles from './index.module.css';

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

export default function Page (): JSX.Element {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 111).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
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
                <div>
                Today: {todayString}
                </div>
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
