'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Произошла ошибка:', error);
  }, [error]);

  return (
    <html>
      <body>
        <h2>Глобальная ошибка!</h2>
        <button onClick={() => reset()}>Retry</button>
      </body>
    </html>
  );
}
