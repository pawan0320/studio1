'use client';

import React, { useEffect, useRef } from 'react';

const SplineViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure this runs only on the client side
    if (typeof window === 'undefined' || !containerRef.current) {
      return;
    }

    // Prevent adding multiple viewers
    if (containerRef.current.querySelector('spline-viewer')) {
      return;
    }

    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.51/build/spline-viewer.js';
    script.async = true;

    script.onload = () => {
      if (containerRef.current) {
        const splineViewer = document.createElement('spline-viewer');
        splineViewer.setAttribute('url', 'https://prod.spline.design/h3Ws-VBARUkWGJqd/scene.splinecode');
        splineViewer.setAttribute('events-target', 'global');
        
        // Clear the container and append the new viewer
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(splineViewer);
      }
    };
    
    document.head.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      document.head.removeChild(script);
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default SplineViewer;
