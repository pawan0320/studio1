
'use client';

import { useEffect, useState } from 'react';

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
      document.body.removeChild(script);
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
