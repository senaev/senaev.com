import { useEffect } from "react";

// eslint-disable-next-line no-unused-vars
declare let adsbygoogle: any;

function AdUnit() {
  useEffect(() => {
    (adsbygoogle = (window as any).adsbygoogle || []).push({});
  })

  return <>
    <ins className="adsbygoogle"
        style={{
          display:'inline-block',
          width:320,
          height:180,
        }}
        data-ad-client="ca-pub-5756750483186348"
        data-ad-slot="3155757085"/>
  </>
}


export default function Page() {
  return (
    <AdUnit />
  );
}
