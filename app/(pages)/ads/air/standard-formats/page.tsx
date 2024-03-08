import { AirAdUnit } from 'components/AirAdUnit';

export default function Page (): JSX.Element {
    return (
        <>
            <AirAdUnit
                size={{
                    width: 320,
                    height: 180,
                }}
                blockId={'R-A-2349763-1'}
            />
            <AirAdUnit
                size={{
                    width: 180,
                    height: 320,
                }}
                blockId={'R-A-2349763-1'}
            />
            <AirAdUnit
                size={{
                    width: 320,
                    height: 480,
                }}
                blockId={'R-A-2349763-1'}
            />
            <AirAdUnit
                size={{
                    width: 480,
                    height: 320,
                }}
                blockId={'R-A-2349763-1'}
            />
        </>
    );
}
