
'use client';

import Spline from '@splinetool/react-spline';

export default function SplineWrapper({ scene }: { scene: string }) {
  return (
    <div className="absolute top-0 left-0 w-full h-full">
        <Spline
          scene={scene} 
        />
    </div>
  );
}
