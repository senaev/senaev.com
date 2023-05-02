import { callFirstThenOther } from '.';

describe('callFirstThenOther', () => {
    let first: jest.Mock;
    let other: jest.Mock;

    beforeEach(() => {
        first = jest.fn(() => {
            return 1;
        });
        other = jest.fn(() => {
            return 2;
        });
    });

    it('should call first once and other for all other calls', () => {
        const wrapper = callFirstThenOther(first, other);

        expect(wrapper('foo', 'bar')).toEqual(1);
        expect(first.mock.calls.length).toEqual(1);
        expect(other.mock.calls.length).toEqual(0);
        expect(first.mock.calls[0]).toEqual(['foo', 'bar']);

        expect(wrapper('bla', 'foo')).toEqual(2);
        expect(first.mock.calls.length).toEqual(1);
        expect(other.mock.calls.length).toEqual(1);
        expect(other.mock.calls[0]).toEqual(['bla', 'foo']);

        expect(wrapper('foobar')).toEqual(2);
        expect(first.mock.calls.length).toEqual(1);
        expect(other.mock.calls.length).toEqual(2);
        expect(other.mock.calls[1]).toEqual(['foobar']);
    });
});
