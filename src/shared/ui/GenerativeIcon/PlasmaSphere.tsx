import { useRef, useEffect, useMemo } from 'react';
import type { GenerativeIconProps } from './types';

interface Point3D {
    x: number;
    y: number;
    z: number;
}

const DEFAULT_COLOR = 'rgba(255,255,255,0.6)';

const POINT_COUNT = 90;
const ROTATION_SPEED = 0.008;
const SPHERE_RADIUS_RATIO = 0.4;
const VISIBILITY_Z = -0.8;
const POINT_SIZE = 1.3;

const fadeColor = (color: string, alpha: number) => {
    if (!color.includes('rgba')) return color;
    return color.replace(/[\d.]+\)$/g, `${alpha})`);
};

export const PlasmaSphere: React.FC<GenerativeIconProps> = ({
    size = 80,
    color = DEFAULT_COLOR,
    animated = true,
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rafRef = useRef<number | null>(null);

    // generate evenly distributed points on sphere
    const points = useMemo<Point3D[]>(() => {
        const pts: Point3D[] = [];

        for (let i = 0; i < POINT_COUNT; i++) {
            const phi = Math.acos(-1 + (2 * i) / POINT_COUNT);
            const theta = Math.sqrt(POINT_COUNT * Math.PI) * phi;

            pts.push({
                x: Math.cos(theta) * Math.sin(phi),
                y: Math.sin(theta) * Math.sin(phi),
                z: Math.cos(phi),
            });
        }

        return pts;
    }, []);

    useEffect(() => {
        if (!animated) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const startAnimation = () => {
            const dpr = window.devicePixelRatio || 1;
            const center = size / 2;
            const radius = size * SPHERE_RADIUS_RATIO;

            // scale canvas for DPR
            canvas.width = size * dpr;
            canvas.height = size * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            let rotation = 0;

            const animate = () => {
                ctx.clearRect(0, 0, size, size);

                rotation += ROTATION_SPEED;

                points.forEach((p) => {
                    // rotate around Y axis
                    const x = p.x * Math.cos(rotation) - p.z * Math.sin(rotation);
                    const z = p.x * Math.sin(rotation) + p.z * Math.cos(rotation);
                    const y = p.y;

                    // simple perspective projection
                    const perspective = (z + 2) / 3;

                    const screenX = center + x * radius * perspective;
                    const screenY = center + y * radius * perspective;

                    // skip points behind sphere
                    if (z <= VISIBILITY_Z) return;

                    ctx.beginPath();
                    ctx.arc(screenX, screenY, POINT_SIZE * perspective, 0, Math.PI * 2);

                    ctx.fillStyle = fadeColor(color, perspective * 0.7);
                    ctx.fill();
                });

                rafRef.current = requestAnimationFrame(animate);
            };

            rafRef.current = requestAnimationFrame(animate);
        };

        // start only when canvas enters viewport
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    startAnimation();
                    observer.disconnect();
                }
            },
            { threshold: 0.1 },
        );

        observer.observe(canvas);

        return () => {
            observer.disconnect();
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [points, size, color, animated]);

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
