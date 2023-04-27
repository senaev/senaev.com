import React from 'react';

import { PageLayoutWrapper } from 'components/PageLayoutWrapper';

export default function Layout({ children }: { children: React.ReactNode; }) {
    return (
        <PageLayoutWrapper>
            {children}
        </PageLayoutWrapper>
    );
}
