import React from 'react';

import { LayoutWrapper } from 'components/LayoutWrapper';

import '../globals/globals.css';

// eslint-disable-next-line no-restricted-exports -- page
export default function Layout({ children }: { children: React.ReactNode; }) {
    return (
        <html lang={'en'}>
            {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
            <head />
            <body>
                <LayoutWrapper>
                    {children}
                </LayoutWrapper></body>
        </html>
    );
}
