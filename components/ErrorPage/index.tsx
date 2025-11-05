import type { JSX } from 'react';

export function ErrorPage ({
    message,
}: {
  message: string;
}): JSX.Element {
    return (
        <div>
            {message}
        </div>
    );
}
