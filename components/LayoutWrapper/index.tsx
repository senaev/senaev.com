import { GoogleAdSenseCodeSnippet } from "components/GoogleAdSenseCodeSnippet";
import { GoogleAnalyticsCodeSnippet } from "components/GoogleAnalyticsCodeSnippet";
import { YandexMetrikaCounter } from "components/YandexMetrikaCounter";
import React from "react";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <YandexMetrikaCounter />
      <GoogleAdSenseCodeSnippet />
      <GoogleAnalyticsCodeSnippet />
      {children}
    </>
  );
}
