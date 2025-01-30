import { YandexAdUnit } from 'components/YandexAdUnit';

function YandexAdUnitWrapped ({
    size,
    blockId,
}: {
  size: {
    width: number
    height: number
  }
  blockId: string
}): JSX.Element {
    const { width, height } = size;

    return (
        <div
            style={{
                width,
                height: height + 45,
            }}
        >
            <h3>
                {`${width}x${height}`}
            </h3>
            <YandexAdUnit blockId={blockId} />
        </div>
    );
}

export default function Page (): JSX.Element {
    return (
        <>
            <YandexAdUnitWrapped
                size={{
                    width: 320,
                    height: 180,
                }}
                blockId={'R-A-2349763-1'}
            />
            <YandexAdUnitWrapped
                size={{
                    width: 180,
                    height: 320,
                }}
                blockId={'R-A-2349763-1'}
            />
            <YandexAdUnitWrapped
                size={{
                    width: 320,
                    height: 480,
                }}
                blockId={'R-A-2349763-1'}
            />
            <YandexAdUnitWrapped
                size={{
                    width: 480,
                    height: 320,
                }}
                blockId={'R-A-2349763-1'}
            />
        </>
    );
}
