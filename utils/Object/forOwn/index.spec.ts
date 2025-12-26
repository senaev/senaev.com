import {
    describe,
    expect,
    it,
} from 'vitest';
import { forOwn } from './';

const a = 1;
const b = 2;
const c = 4;

describe('forOwn', () => {
    it('should use only own property', () => {
        let sum = 0;

        const obj = Object.assign(Object.create({ c }) as {
            c: number;
        }, {
            a,
            b,
        });
        expect(obj.a).toEqual(a);
        expect(obj.b).toEqual(b);
        forOwn(obj, (elem) => (sum += elem));
        expect(sum).toEqual(b + a);
    });

    it('should call callback with scope', () => {
        let sum = 0;

        const obj = Object.assign(
            Object.create({
                c,
                run(elem: number) {
                    sum += (this as { c: number; }).c + elem;
                },
            }) as {
                c: number;
                run: () => void;
            },
            {
                a,
                b,
            }
        );

        forOwn(obj, obj.run, obj);

        expect(sum).toEqual(a + b + c + c);
    });

    it('should correctly pass all elem, key and object in callback', () => {
        const testObj = {
            a,
            b,
            c,
        };
        forOwn(testObj, (elem, key, obj) => {
            if (obj[key] !== elem) {
                throw new Error('element has not been passed');
            }
        });
    });

    it('should not throw for Object with null as __proto__', () => {
        const testObj = Object.create(null) as Record<string, unknown>;

        Object.assign(testObj, {
            a,
            b,
            c,
        });

        forOwn(testObj, () => {
            // not empty
        });
    });

    it('should iterate via all props on Object with null as __proto__', () => {
        const testObj = Object.create(null) as Record<string, unknown>;

        Object.assign(testObj, {
            a,
            b,
            c,
        });

        const iteratedEntries: unknown[] = [];
        const saver = (value: unknown, key: unknown) => {
            iteratedEntries.push([
                value,
                key,
            ]);
        };

        forOwn(testObj, saver);

        expect(iteratedEntries.length).toEqual(3);
        expect(iteratedEntries).toEqual(expect.arrayContaining([
            [
                a,
                'a',
            ],
            [
                b,
                'b',
            ],
            [
                c,
                'c',
            ],
        ]));
    });
});
