'use client';

import Script from 'next/script';
import { useState } from 'react';

export default function SplineViewer() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Script
        src="https://unpkg.com/@splinetool/viewer@1.10.51/build/spline-viewer.js"
        type="module"
        onLoad={() => setIsLoaded(true)}
      />
      {isLoaded && (
        <spline-viewer
          url="https://prod.spline.design/9prYyFJAbaItPspb/scene.splinecode"
          style={{ width: '100%', height: '100%', borderRadius: '1rem' }}
        />
      )}
    </>
  );
}
