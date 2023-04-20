import { YandexMetrikaCounter } from "components/YandexMetrikaCounter";
import React from "react";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <YandexMetrikaCounter />
            {/* <!-- Yandex.RTB --> */}
            <script 
          // id={'ya-context-cb-global-initializer'} 
          // strategy={'worker'}
          dangerouslySetInnerHTML={{
            __html: 'window.yaContextCb=window.yaContextCb||[]'
          }} 
        />
        <script src="https://yandex.ru/ads/system/context.js" async></script>
      {children}
    </>
  );
}
