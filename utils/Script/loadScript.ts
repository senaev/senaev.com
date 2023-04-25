export function loadScript(src: string): Promise<void> {
    // eslint-disable-next-line no-restricted-globals -- ignore
    const doc = document;

    const script = doc.createElement('script');
    script.src = src;

    const promise = new Promise<void>((resolve, reject) => {
        script.onload = () => {
            resolve();
        };
        script.onerror = reject;
    });

    doc.head.appendChild(script);

    return promise;
}
