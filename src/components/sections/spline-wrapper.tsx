
'use client';

import Spline from '@splinetool/react-spline/next';

export default function SplineWrapper({ scene }: { scene: string }) {
  return <Spline scene={scene} />;
}
