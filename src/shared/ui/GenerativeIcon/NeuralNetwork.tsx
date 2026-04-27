import { useRef, useEffect } from 'react';
import type { GenerativeIconProps } from './types';

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
}

const DEFAULT_COLOR = 'rgba(255,255,255,0.6)';

const fadeColor = (color: string, alpha: number) => {
    if (!color.includes('rgba')) return color;
    return color.replace(/[\d.]+\)$/g, `${alpha})`);
};

const NODE_COUNT = 12;
const NODE_RADIUS = 1.5;
const EDGE_WIDTH = 0.5;
const BOUNDS_PADDING = 5;

export const NeuralNetwork: React.FC<GenerativeIconProps> = ({
    size = 80,
    color = DEFAULT_COLOR,
    animated = true,
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const nodesRef = useRef<Node[]>([]);
    const rafRef = useRef<number | null>(null);

    // initialize nodes on size change
    useEffect(() => {
        nodesRef.current = Array.from({ length: NODE_COUNT }, () => ({
            x: Math.random() * (size - 20) + 10,
            y: Math.random() * (size - 20) + 10,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
        }));
    }, [size]);

    useEffect(() => {
        if (!animated) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const startAnimation = () => {
            const dpr = window.devicePixelRatio || 1;

            // scale canvas for retina displays
            canvas.width = size * dpr;
            canvas.height = size * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const maxDistance = size * 0.3;
            const nodes = nodesRef.current;

            const updateNode = (n: Node) => {
                // update position
                n.x += n.vx;
                n.y += n.vy;

                // bounce from bounds
                if (n.x < BOUNDS_PADDING || n.x > size - BOUNDS_PADDING) n.vx *= -1;
                if (n.y < BOUNDS_PADDING || n.y > size - BOUNDS_PADDING) n.vy *= -1;
            };

            const drawConnections = (n: Node, i: number) => {
                for (let j = i + 1; j < nodes.length; j++) {
                    const n2 = nodes[j];

                    const dx = n.x - n2.x;
                    const dy = n.y - n2.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist >= maxDistance) continue;

                    const alpha = (1 - dist / maxDistance) * 0.5;

                    ctx.strokeStyle = fadeColor(color, alpha);
                    ctx.lineWidth = EDGE_WIDTH;

                    ctx.beginPath();
                    ctx.moveTo(n.x, n.y);
                    ctx.lineTo(n2.x, n2.y);
                    ctx.stroke();
                }
            };

            const drawNode = (n: Node) => {
                ctx.fillStyle = fadeColor(color, 1);

                ctx.beginPath();
                ctx.arc(n.x, n.y, NODE_RADIUS, 0, Math.PI * 2);
                ctx.fill();
            };

            const animate = () => {
                ctx.clearRect(0, 0, size, size);

                nodes.forEach((n, i) => {
                    updateNode(n);
                    drawConnections(n, i);
                    drawNode(n);
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
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
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
