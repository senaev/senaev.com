import type { CubeDirection } from '../types/CubeDirection';

import { getObjectKeys } from 'utils/Object/getObjectKeys';

export const CUBE_COLORS = {
    blue: undefined,
    green: undefined,
    yellow: undefined,
    red: undefined,
    brown: undefined,
    pink: undefined,
    white: undefined,
    purple: undefined,
    lightblue: undefined,
    orange: undefined,
};

export const ALL_CUBE_COLORS = getObjectKeys(CUBE_COLORS);
export type CubeColor = keyof typeof CUBE_COLORS

export const CUBES_DATA = {
    // ширина доски в кубиках
    cubesWidth: 10,
    // ширина одного контейнера кубика
    oneWidth: 32,
    // список полей
    fields: [
        'main',
        'top',
        'right',
        'bottom',
        'left',
    ],
    // время одного шага анимации
    animTime: 45,
    // возможные цвета кубиков
    colors: ALL_CUBE_COLORS,
    f: {
    // распределение по уровням
        level: {
            colorsCount (level: number): number {
                if (level > 0 && level < 11) {
                    return 5;
                }

                return 6;
            },
            cubesCount (level: number): number {
                if ((level > 0 && level < 11) || level === 100) {
                    const cubesCount: Record<string, number> = {
                        1: 6,
                        2: 11,
                        3: 11,
                        4: 9,
                        5: 11,
                        6: 12,
                        7: 7,
                        8: 13,
                        9: 12,
                        10: 18,
                        100: 25,
                    };

                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- ignore
                    return cubesCount[level.toString()]!;
                }

                return level - 11 + 16;
            },
            getPositions (level: number): Array<[number, number]> {
                if ((level > 0 && level < 11) || level === 100) {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- ignore
                    return CUBES_DATA.numbers[level.toString()]!;
                }

                return CUBES_DATA.firstCubesPositionsPicture;
            },
        },

        rand: function rand (min: number, max: number): number {
            // eslint-disable-next-line no-bitwise -- ignore
            return min + ((max - min + 1) * Math.random() ^ 0);
        },
        reverseField (field: CubeDirection): CubeDirection {
            if (field === 'top') {
                return 'bottom';
            }

            if (field === 'bottom') {
                return 'top';
            }

            if (field === 'left') {
                return 'right';
            }

            return 'left';
        },
    },
    // координаты кубиков для уровней с рисунками
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    numbers: {
        1: [
            [
                4,
                3,
            ],
            [
                5,
                3,
            ],
            [
                5,
                4,
            ],
            [
                5,
                5,
            ],
            [
                5,
                6,
            ],
            [
                5,
                7,
            ],
        ],
        2: [
            [
                3,
                2,
            ],
            [
                4,
                2,
            ],
            [
                5,
                2,
            ],
            [
                5,
                3,
            ],
            [
                5,
                4,
            ],
            [
                4,
                4,
            ],
            [
                3,
                4,
            ],
            [
                3,
                5,
            ],
            [
                3,
                6,
            ],
            [
                4,
                6,
            ],
            [
                5,
                6,
            ],
        ],
        3: [
            [
                3,
                3,
            ],
            [
                4,
                3,
            ],
            [
                5,
                3,
            ],
            [
                5,
                4,
            ],
            [
                5,
                5,
            ],
            [
                5,
                6,
            ],
            [
                4,
                5,
            ],
            [
                5,
                7,
            ],
            [
                3,
                5,
            ],
            [
                4,
                7,
            ],
            [
                3,
                7,
            ],
        ],
        4: [
            [
                4,
                2,
            ],
            [
                4,
                3,
            ],
            [
                4,
                4,
            ],
            [
                5,
                4,
            ],
            [
                6,
                4,
            ],
            [
                6,
                3,
            ],
            [
                6,
                5,
            ],
            [
                6,
                2,
            ],
            [
                6,
                6,
            ],
        ],
        5: [
            [
                6,
                3,
            ],
            [
                5,
                3,
            ],
            [
                4,
                3,
            ],
            [
                4,
                4,
            ],
            [
                4,
                5,
            ],
            [
                5,
                5,
            ],
            [
                6,
                5,
            ],
            [
                6,
                6,
            ],
            [
                6,
                7,
            ],
            [
                5,
                7,
            ],
            [
                4,
                7,
            ],
        ],
        6: [
            [
                3,
                2,
            ],
            [
                3,
                3,
            ],
            [
                4,
                2,
            ],
            [
                3,
                4,
            ],
            [
                5,
                2,
            ],
            [
                4,
                4,
            ],
            [
                3,
                5,
            ],
            [
                5,
                4,
            ],
            [
                3,
                6,
            ],
            [
                5,
                5,
            ],
            [
                4,
                6,
            ],
            [
                5,
                6,
            ],
        ],
        7: [
            [
                3,
                3,
            ],
            [
                4,
                3,
            ],
            [
                5,
                3,
            ],
            [
                5,
                4,
            ],
            [
                5,
                5,
            ],
            [
                5,
                6,
            ],
            [
                5,
                7,
            ],
            [
                5,
                8,
            ],
        ],
        8: [
            [
                4,
                2,
            ],
            [
                5,
                2,
            ],
            [
                6,
                2,
            ],
            [
                6,
                3,
            ],
            [
                6,
                4,
            ],
            [
                6,
                5,
            ],
            [
                6,
                6,
            ],
            [
                5,
                6,
            ],
            [
                4,
                6,
            ],
            [
                4,
                5,
            ],
            [
                4,
                4,
            ],
            [
                4,
                3,
            ],
            [
                5,
                4,
            ],
        ],
        9: [
            [
                3,
                2,
            ],
            [
                4,
                2,
            ],
            [
                5,
                2,
            ],
            [
                5,
                3,
            ],
            [
                5,
                4,
            ],
            [
                5,
                5,
            ],
            [
                5,
                6,
            ],
            [
                4,
                6,
            ],
            [
                3,
                6,
            ],
            [
                3,
                3,
            ],
            [
                3,
                4,
            ],
            [
                4,
                4,
            ],
        ],
        10: [
            [
                2,
                3,
            ],
            [
                3,
                3,
            ],
            [
                3,
                4,
            ],
            [
                3,
                5,
            ],
            [
                3,
                6,
            ],
            [
                3,
                7,
            ],
            [
                5,
                3,
            ],
            [
                5,
                4,
            ],
            [
                5,
                5,
            ],
            [
                5,
                6,
            ],
            [
                5,
                7,
            ],
            [
                6,
                7,
            ],
            [
                7,
                7,
            ],
            [
                7,
                6,
            ],
            [
                7,
                5,
            ],
            [
                7,
                4,
            ],
            [
                7,
                3,
            ],
            [
                6,
                3,
            ],
        ],
        100: [
            [
                0,
                3,
            ],
            [
                1,
                3,
            ],
            [
                1,
                4,
            ],
            [
                1,
                5,
            ],
            [
                1,
                6,
            ],
            [
                3,
                3,
            ],
            [
                3,
                4,
            ],
            [
                3,
                5,
            ],
            [
                3,
                6,
            ],
            [
                4,
                6,
            ],
            [
                5,
                6,
            ],
            [
                5,
                5,
            ],
            [
                5,
                4,
            ],
            [
                5,
                3,
            ],
            [
                4,
                3,
            ],
            [
                7,
                3,
            ],
            [
                7,
                4,
            ],
            [
                7,
                5,
            ],
            [
                7,
                6,
            ],
            [
                8,
                6,
            ],
            [
                9,
                6,
            ],
            [
                9,
                5,
            ],
            [
                9,
                4,
            ],
            [
                9,
                3,
            ],
            [
                8,
                3,
            ],
        ],
    } as Record<string, Array<[number, number]>>,
    // стандартный рисунок на главном экране
    firstCubesPositionsPicture: [
        [
            4,
            4,
        ],
        [
            5,
            4,
        ],
        [
            5,
            5,
        ],
        [
            4,
            5,
        ],
        [
            3,
            3,
        ],
        [
            6,
            3,
        ],
        [
            6,
            6,
        ],
        [
            3,
            6,
        ],
        [
            4,
            2,
        ],
        [
            7,
            4,
        ],
        [
            5,
            7,
        ],
        [
            2,
            5,
        ],
        [
            5,
            2,
        ],
        [
            7,
            5,
        ],
        [
            4,
            7,
        ],
        [
            2,
            4,
        ],
    ] as Array<[number, number]>,
} as const;
