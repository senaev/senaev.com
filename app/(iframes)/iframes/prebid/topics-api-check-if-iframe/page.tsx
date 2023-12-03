
import Script from 'next/script';

export default function Page() {
    return (
        <Script
            strategy={'beforeInteractive'}
            src={'/prebid/topics-api-iframe-script.js'}
        />
    );
}
