import { useRef, useEffect } from 'react';
import type { GenerativeIconProps } from './types';

interface Line {
    x: number;
    y: number;
    speed: number;
    len: number;
}

const DEFAULT_COLOR = 'oklch(70% 0.14 250)';

// converts any color into transparent variant via color-mix
const withAlpha = (color: string, alpha: number) => {
    return `color-mix(in oklch, ${color} ${alpha * 100}%, transparent)`;
};

export const DataStream: React.FC<GenerativeIconProps> = ({
    size = 80,
    color = DEFAULT_COLOR,
    animated = true,
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // stores animated state outside React
    const linesRef = useRef<Line[]>([]);

    useEffect(() => {
        // generate vertical streams with random position and speed
        linesRef.current = Array.from({ length: 6 }, () => ({
            x: Math.random() * (size - size * 0.25) + size * 0.125,
            y: Math.random() * size,
            speed: 1.5 + Math.random() * 2,
            len: size * (0.2 + Math.random() * 0.3),
        }));
    }, [size]);

    useEffect(() => {
        if (!animated) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;

        // scale canvas for retina displays
        canvas.width = size * dpr;
        canvas.height = size * dpr;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        let rafId: number;

        const draw = () => {
            // clear previous frame
            ctx.clearRect(0, 0, size, size);

            linesRef.current.forEach((l) => {
                // vertical gradient from transparent to solid
                const gradient = ctx.createLinearGradient(0, l.y, 0, l.y + l.len);

                gradient.addColorStop(0, withAlpha(color, 0));
                gradient.addColorStop(1, withAlpha(color, 0.9));

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.lineCap = 'round';

                // draw single vertical line
                ctx.beginPath();
                ctx.moveTo(l.x, l.y);
                ctx.lineTo(l.x, l.y + l.len);
                ctx.stroke();

                // move line down
                l.y += l.speed;

                // loop back to top when out of bounds
                if (l.y > size) l.y = -l.len;
            });

            rafId = requestAnimationFrame(draw);
        };

        rafId = requestAnimationFrame(draw);

        // stop animation on unmount
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
