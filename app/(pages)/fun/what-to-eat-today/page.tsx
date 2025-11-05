import type { JSX } from 'react';

export const dynamic = 'force-dynamic';

// export function getHashFromString(str: string): number {
//     let hash = 0,
//         i, chr;
//     if (str.length === 0) {
//         return hash;
//     }

//     for (i = 0; i < str.length; i++) {
//         chr = str.charCodeAt(i);
//         hash = ((hash << 5) - hash) + chr;
//         hash |= 0; // Convert to 32bit integer
//     }

//     return hash;
// }

// const GROCCERY: Record<string, string[]> = {
//     'How to cook Main Course': [
//         'Boil',
//         'Fry',
//         'Bake',
//     ],
//     'Main Course': [
//         'Beef',
//         'Pork',
//         'Chicken',
//         'Fish',
//     ],
//     'How to cook Side dish': [
//         'boil',
//         'fry',
//         'bake',
//     ],
//     'Side dish': [
//         'Potatoe',
//         'Rice',
//         'Buckwheat',
//         'Pasta',
//     ],
// };

// const CURRENT_PAGE_URL = '/fun/what-to-eat-today';

export default async function Page ({ searchParams }: { searchParams: Promise<{ offset: string }> }): Promise<JSX.Element> {
    return <>
        {null}
    </>;
    // let resultOffset = 0;
    // const { offset } = await searchParams;
    // if (offset !== undefined) {
    //     if (!Number.isInteger(Number(offset))) {
    //         throw new Error(`offset=[${offset}] is NOT valid`);
    //     }

    //     resultOffset = Number(offset);
    // }

    // const date = new Date();
    // date.setDate(date.getDate() + resultOffset);
    // const year = date.getFullYear();
    // const month = String(date.getMonth() + 1).padStart(2, '0');
    // const day = String(date.getDate()).padStart(2, '0');
    // const todayString = `${year}-${month}-${day}`;
    // const hash = String(Math.abs(getHashFromString(todayString))).padStart(Object.keys(GROCCERY).length, String(day)[0]).split('').reverse();

    // const randoms = getObjectEntries(GROCCERY).map(([
    //     name,
    //     arr,
    // ], i) => {
    //     const initialNumber = Number(hash[i]);
    //     const index = initialNumber % arr.length;

    //     return [
    //         name,
    //         arr[index],
    //     ];
    // });

    // return (
    //     <div className={styles.Container}>
    //         <div className={styles.ServiceInfo}>
    //             <a href={`${CURRENT_PAGE_URL}?offset=${resultOffset - 1}`}>
    //                 {'Yesterday'}
    //             </a>
    //             <div>
    //                 <a href={CURRENT_PAGE_URL}>
    //                     {'Today'}
    //                 </a>
    //                 {':'}
    //                 {todayString}
    //             </div>
    //             <a href={`${CURRENT_PAGE_URL}?offset=${resultOffset + 1}`}>
    //                 {'Tomorrow'}
    //             </a>
    //             <div>
    //                 {'Hash: '}
    //                 {hash.join('')}
    //             </div>
    //             <div>
    //                 {'We are eating: '}
    //                 {JSON.stringify(randoms)}
    //             </div>
    //         </div>
    //         <div className={styles.MainInfo}>
    //             <div>
    //                 {`${randoms[0]![1]} ${randoms[1]![1]} and ${randoms[2]![1]} ${randoms[3]![1]}`}
    //             </div>
    //         </div>
    //     </div>
    // );
}
