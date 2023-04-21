import { useEffect } from "react";

declare const Ya: any;
declare const yaContextCb: any;

function AdUnit({
  size,
  blockId,
}: {
  size: {
    width: number;
    height: number;
  }
  blockId: string;
}) {
  const {width, height} = size;

  const elementId = `${blockId}-element`;

  useEffect(() => {
    const callback = () => Ya.Context.AdvManager.render({
      "blockId": blockId,
      "renderTo": elementId
    });

    if (typeof Ya !== 'undefined' && Ya.Context) {
      callback();
    } else {
      yaContextCb.push(()=>{callback});
    }
  }, [blockId, elementId]);

  return <div style={{
    width, height: height + 45
  }}>
    <h3>{`${width}x${height}`}</h3>
    <div 
      style={{
        width, height
      }}
      id={elementId}
    />
  </div>
}


export default function Page() {
  return (
    <AdUnit
      size={{
        width: 320,
        height: 180,
      }}
      blockId={'R-A-2349763-1'}
    />
  );
}
