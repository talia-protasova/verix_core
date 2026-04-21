import { useEffect, useRef } from 'react';
import type { GenerativeIconProps } from './types';

const DEFAULT_COLOR = 'rgba(255,255,255,0.6)';

const ORBIT_RADIUS_FACTORS = [0.22, 0.35, 0.45];
const ORBIT_HEIGHT_RATIO = 0.4;
const DASH_RATIO = [0.12, 0.18] as const;
const LINE_WIDTH = 1.5;
const ANGLE_STEP = 0.015;

const fadeColor = (color: string, alpha: number) => {
    if (!color.includes('rgba')) return color;
    return color.replace(/[\d.]+\)$/g, `${alpha})`);
};

export const OrbitConcentric: React.FC<GenerativeIconProps> = ({
    size = 80,
    color = DEFAULT_COLOR,
    animated = true,
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        if (!animated) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const center = size / 2;
        const radiuses = ORBIT_RADIUS_FACTORS.map((factor) => size * factor);

        // scale canvas for high-DPI screens
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        let angle = 0;

        const animate = () => {
            ctx.clearRect(0, 0, size, size);

            // apply shared stroke settings once per frame
            ctx.lineWidth = LINE_WIDTH;
            ctx.setLineDash([size * DASH_RATIO[0], size * DASH_RATIO[1]]);

            radiuses.forEach((radius, index) => {
                // keep original rotation behavior
                const currentAngle = angle * (index % 2 === 0 ? 1 : -1.2);

                ctx.strokeStyle = fadeColor(color, 0.3 + index * 0.2);

                ctx.beginPath();
                ctx.ellipse(
                    center,
                    center,
                    radius,
                    radius * ORBIT_HEIGHT_RATIO,
                    currentAngle,
                    0,
                    Math.PI * 2,
                );
                ctx.stroke();
            });

            angle += ANGLE_STEP;
            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [size, color, animated]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                width: size,
                height: size,
            }}
        />
    );
};
