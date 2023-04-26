import { YandexAdUnit } from 'components/YandexAdUnit';

// eslint-disable-next-line no-restricted-exports -- page
export default function Page() {
    return (
        <YandexAdUnit
            size={{
                width: 320,
                height: 180,
            }}
            blockId={'R-A-2349763-1'}
        />
    );
}
