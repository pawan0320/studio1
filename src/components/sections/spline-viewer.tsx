
'use client';

import Script from 'next/script';
import {useEffect, useRef} from 'react';

// Define the type for the Spline Viewer custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        url: string;
        'events-target'?: string;
      };
    }
  }
}

export default function SplineViewer({scene}: {scene: string}) {
  const splineRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // This effect ensures client-side execution
  }, []);

  return (
    <>
      <Script
        type="module"
        src="https://unpkg.com/@splinetool/viewer@1.10.51/build/spline-viewer.js"
      />
      <spline-viewer
        ref={splineRef}
        url={scene}
        events-target="global"
        className="w-full h-full"
      />
    </>
  );
}
