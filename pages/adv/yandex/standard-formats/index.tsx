function AdUnit({
  size,
  insertCode,
}: {
  size: {
    width: number;
    height: number;
  }
  insertCode: string;
}) {
  const {width, height} = size;

  return <div>
    <h3>{`${width}x${height}`}</h3>
    <div 
    style={{
      width, height
    }}
    dangerouslySetInnerHTML={{
      __html: insertCode
    }}
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
      insertCode={`
      <!-- Yandex.RTB R-A-2345633-1 -->
      <div id="yandex_rtb_R-A-2345633-1"></div>
      <script>window.yaContextCb.push(()=>{
        Ya.Context.AdvManager.render({
          renderTo: 'yandex_rtb_R-A-2345633-1',
          blockId: 'R-A-2345633-1'
        })
      })</script>
      `}
    />
  );
}
