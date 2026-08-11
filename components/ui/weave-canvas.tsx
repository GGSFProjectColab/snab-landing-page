'use client';

import { useEffect, useRef } from 'react';

export function WeaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const COLS = 10;
    const ROWS = 10;
    const GUTTER_RATIO = 0.19;
    const FIELD_ANGLE = Math.PI / 4;
    const TURNS = 2;
    const SPREAD = 0.5;
    const LOOP_DURATION = 6000;

    let animationId: number;
    let startTime: number | null = null;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function clipHalfPlane(
      polygon: [number, number][],
      angle: number,
      dist: number,
      cx: number,
      cy: number
    ): [number, number][] {
      const nx = Math.cos(angle);
      const ny = Math.sin(angle);
      const out: [number, number][] = [];

      for (let i = 0; i < polygon.length; i++) {
        const curr = polygon[i];
        const next = polygon[(i + 1) % polygon.length];
        const d0 = (curr[0] - cx) * nx + (curr[1] - cy) * ny;
        const d1 = (next[0] - cx) * nx + (next[1] - cy) * ny;
        const in0 = d0 <= dist;
        const in1 = d1 <= dist;

        if (in0) {
          out.push(curr);
          if (!in1) {
            const t = (dist - d0) / (d1 - d0);
            out.push([curr[0] + t * (next[0] - curr[0]), curr[1] + t * (next[1] - curr[1])]);
          }
        } else if (in1) {
          const t = (dist - d0) / (d1 - d0);
          out.push([curr[0] + t * (next[0] - curr[0]), curr[1] + t * (next[1] - curr[1])]);
        }
      }
      return out;
    }

    function easeInOut(t: number): number {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function render(timestamp: number) {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const tau = (elapsed % LOOP_DURATION) / LOOP_DURATION;

      const rect = canvas!.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx!.clearRect(0, 0, w, h);
      ctx!.fillStyle = '#000000';
      ctx!.fillRect(0, 0, w, h);

      const tileW = w / (COLS + (COLS - 1) * GUTTER_RATIO);
      const tileH = h / (ROWS + (ROWS - 1) * GUTTER_RATIO);
      const tile = Math.min(tileW, tileH);
      const gutterX = tile * GUTTER_RATIO;
      const gutterY = tile * GUTTER_RATIO;
      const pitchX = tile + gutterX;
      const pitchY = tile + gutterY;

      const gridW = COLS * tile + (COLS - 1) * gutterX;
      const gridH = ROWS * tile + (ROWS - 1) * gutterY;
      const offsetX = (w - gridW) / 2;
      const offsetY = (h - gridH) / 2;

      const gcx = w / 2;
      const gcy = h / 2;
      const maxR = Math.hypot(Math.max(gcx, w - gcx), Math.max(gcy, h - gcy));
      const maxDiag = (COLS - 1) + (ROWS - 1);

      const easedTau = easeInOut(tau);

      ctx!.fillStyle = '#FFFFFF';
      ctx!.beginPath();

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const tx = offsetX + c * pitchX;
          const ty = offsetY + r * pitchY;
          const cx = tx + tile / 2;
          const cy = ty + tile / 2;

          const diag = r + c;
          const stagger = (diag / maxDiag) * SPREAD;
          const local = (easedTau + stagger) % 1;

          const rad = Math.hypot(cx - gcx, cy - gcy) / maxR;
          const angle = FIELD_ANGLE + local * TURNS * Math.PI * 2;
          const amp = tile * 0.25 * (1 - rad * 0.6);
          const dist = amp * Math.sin(local * Math.PI * 2 + rad * Math.PI * 4);

          const sq: [number, number][] = [
            [tx, ty],
            [tx + tile, ty],
            [tx + tile, ty + tile],
            [tx, ty + tile],
          ];

          const clipped = clipHalfPlane(sq, angle, dist, cx, cy);
          if (clipped.length >= 3) {
            ctx!.moveTo(clipped[0][0], clipped[0][1]);
            for (let k = 1; k < clipped.length; k++) {
              ctx!.lineTo(clipped[k][0], clipped[k][1]);
            }
            ctx!.closePath();
          }
        }
      }

      ctx!.fill();
      animationId = requestAnimationFrame(render);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    animationId = requestAnimationFrame(render);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ display: 'block' }}
    />
  );
}
