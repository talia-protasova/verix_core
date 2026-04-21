import { useRef, useEffect } from 'react';
import type { GenerativeIconProps } from './types';

interface Cube {
    x: number;
    baseY: number;
    offset: number;
    size: number;
}

const DEFAULT_COLOR = 'rgba(255,255,255,0.6)';

// applies alpha only for rgba colors
const fadeColor = (color: string, alpha: number) => {
    if (!color.includes('rgba')) return color;

    return color.replace(/[\d.]+\)$/g, `${alpha})`);
};

export const FloatingCubes: React.FC<GenerativeIconProps> = ({
    size = 80,
    color = DEFAULT_COLOR,
    animated = true,
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // stores cube config outside React state
    const cubesRef = useRef<Cube[]>([]);

    useEffect(() => {
        // generates cubes once for current size
        cubesRef.current = Array.from({ length: 4 }, (_, i) => ({
            x: size * 0.25 + i * (size * 0.15),
            baseY: size * 0.5,
            offset: Math.random() * Math.PI * 2,
            size: size * (0.12 + Math.random() * 0.05),
        }));
    }, [size]);

    useEffect(() => {
        if (!animated) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;

        // scales canvas for crisp rendering on high-density screens
        canvas.width = size * dpr;
        canvas.height = size * dpr;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        let rafId = 0;
        let time = 0;

        const drawCube = (cube: Cube, y: number) => {
            // draws diamond shape for isometric cube look
            ctx.beginPath();
            ctx.moveTo(cube.x, y - cube.size / 2);
            ctx.lineTo(cube.x + cube.size, y);
            ctx.lineTo(cube.x, y + cube.size / 2);
            ctx.lineTo(cube.x - cube.size, y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        };

        const animate = () => {
            // clears previous frame before redraw
            ctx.clearRect(0, 0, size, size);

            // advances shared animation time
            time += 0.02;

            ctx.fillStyle = fadeColor(color, 0.2);
            ctx.strokeStyle = fadeColor(color, 1);
            ctx.lineWidth = 1;

            cubesRef.current.forEach((cube) => {
                // shifts each cube vertically using sine wave
                const y = cube.baseY + Math.sin(time + cube.offset) * (size * 0.18);

                drawCube(cube, y);
            });

            rafId = requestAnimationFrame(animate);
        };

        rafId = requestAnimationFrame(animate);

        // stops animation on unmount
        return () => cancelAnimationFrame(rafId);
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
