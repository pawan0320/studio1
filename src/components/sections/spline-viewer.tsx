
'use client';

import { useEffect, useState } from 'react';

// By declaring this namespace, we're telling TypeScript about the custom <spline-viewer> element.
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


const SplineViewer = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.51/build/spline-viewer.js';
    script.onload = () => {
      setIsLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      const existingScript = document.querySelector('script[src="https://unpkg.com/@splinetool/viewer@1.10.51/build/spline-viewer.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="w-full h-full">
      {isLoaded ? (
        <spline-viewer
          url="https://prod.spline.design/h3Ws-VBARUkWGJqd/scene.splinecode"
          events-target="global"
        ></spline-viewer>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p>Loading 3D Scene...</p>
        </div>
      )}
    </div>
  );
};

export default SplineViewer;
