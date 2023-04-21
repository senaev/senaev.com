import { YandexMetrikaCounter } from "components/YandexMetrikaCounter";
import React from "react";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <YandexMetrikaCounter />
      {children}
    </>
  );
}
