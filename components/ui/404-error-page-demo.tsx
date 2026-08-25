'use client';

import React from 'react';
import { RetroTvError } from '@/components/ui/404-error-page';

export default function RetroTvErrorDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-4">
      {/* Example 1: Default 404 Error */}
      <div style={{ transform: 'scale(0.8)' }}>
        <RetroTvError />
      </div>
    </div>
  );
}

export { RetroTvErrorDemo };
