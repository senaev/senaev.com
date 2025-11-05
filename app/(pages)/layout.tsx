import React, { type JSX } from 'react';

import { PageLayoutWrapper } from 'components/PageLayoutWrapper';

export default function Layout ({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <PageLayoutWrapper>
            {children}
        </PageLayoutWrapper>
    );
}
