import React from 'react';
import './index.css';

import { PageLayoutWrapper } from 'components/PageLayoutWrapper';

export default function Layout ({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <PageLayoutWrapper>
            {children}
        </PageLayoutWrapper>
    );
}
