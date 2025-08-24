'use client';

import Script from 'next/script';

export default function SplineViewer() {
  return (
    <>
      <Script
        src="https://unpkg.com/@splinetool/viewer@1.10.51/build/spline-viewer.js"
        type="module"
        strategy="lazyOnload"
      />
      <spline-viewer
        url="https://prod.spline.design/9prYyFJAbaItPspb/scene.splinecode"
        events-target="global"
        style={{ width: '100%', height: '100%', borderRadius: '1rem' }}
      />
    </>
  );
}
