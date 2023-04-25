import type { AppProps } from 'next/app';

import { LayoutWrapper } from 'components/LayoutWrapper';
import '../globals/globals.css';

// eslint-disable-next-line no-restricted-exports -- page
export default function Page({ Component, pageProps }: AppProps) {
    return (
        <LayoutWrapper>
            <Component {...pageProps} />
        </LayoutWrapper>
    );
}
