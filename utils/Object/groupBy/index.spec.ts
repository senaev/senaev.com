import { groupBy } from './';

type Student = { name: string; score: number; };

describe('groupBy', () => {
    it('should split the list into groups according to the grouping function', () => {
        const grade = (score: number) => {
            if (score < 65) {
                return 'F';
            }

            if (score < 70) {
                return 'D';
            }

            if (score < 80) {
                return 'C';
            }

            if (score < 90) {
                return 'B';
            }

            return 'A';
        };

        const byGrade = (student: Student) => grade(student.score || 0);
        const students: Student[] = [
            {
                name: 'Abby',
                score: 84,
            },
            {
                name: 'Brad',
                score: 73,
            },
            {
                name: 'Chris',
                score: 89,
            },
            {
                name: 'Dianne',
                score: 99,
            },
            {
                name: 'Eddy',
                score: 58,
            },
            {
                name: 'Fred',
                score: 67,
            },
            {
                name: 'Gillian',
                score: 91,
            },
            {
                name: 'Hannah',
                score: 78,
            },
            {
                name: 'Irene',
                score: 85,
            },
            {
                name: 'Jack',
                score: 69,
            },
        ];

        expect(groupBy(students, byGrade)).toEqual({
            A: [
                {
                    name: 'Dianne',
                    score: 99,
                },
                {
                    name: 'Gillian',
                    score: 91,
                },
            ],
            B: [
                {
                    name: 'Abby',
                    score: 84,
                },
                {
                    name: 'Chris',
                    score: 89,
                },
                {
                    name: 'Irene',
                    score: 85,
                },
            ],
            C: [
                {
                    name: 'Brad',
                    score: 73,
                },
                {
                    name: 'Hannah',
                    score: 78,
                },
            ],
            D: [
                {
                    name: 'Fred',
                    score: 67,
                },
                {
                    name: 'Jack',
                    score: 69,
                },
            ],
            F: [
                {
                    name: 'Eddy',
                    score: 58,
                },
            ],
        });
    });

    it('should correctly handle generic type', () => {
        enum A {
            even = 'even',
            odd = 'odd',
        }

        const arr = groupBy<number, A>([
            1,
            2,
            3,
            4,
            5,
            6,
            7,
        ], (el) => (el % 2 === 0 ? A.even : A.odd));

        expect(arr).toEqual({
            odd: [
                1,
                3,
                5,
                7,
            ],
            even: [
                2,
                4,
                6,
            ],
        });
    });
});
