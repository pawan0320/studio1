'use client';

import Script from 'next/script';
import { useState, useEffect } from 'react';

interface SplineViewerProps {
  url: string;
}

export default function SplineViewer({ url }: SplineViewerProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <Script
        src="https://unpkg.com/@splinetool/viewer@1.10.51/build/spline-viewer.js"
        type="module"
        strategy="lazyOnload"
      />
      {isMounted && (
        <spline-viewer
          url={url}
          events-target="global"
          style={{ width: '100%', height: '100%', borderRadius: '1rem' }}
        />
      )}
    </>
  );
}
