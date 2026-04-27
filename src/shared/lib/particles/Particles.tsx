import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 26;

// palette for particles (kept small to avoid visual noise)
const COLORS = ['#e040fb', '#7c3aed', '#06b6d4'];

interface Particle {
    x: number;
    y: number;
    size: number;
    speed: number;
    drift: number;
    color: string;
    opacity: number;
}

export const Particles = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // handle high DPI screens
        const dpr = window.devicePixelRatio || 1;

        // keep canvas resolution in sync with layout size
        const resize = () => {
            canvas.width = canvas.offsetWidth * dpr;
            canvas.height = canvas.offsetHeight * dpr;

            // normalize coordinate system to CSS pixels
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        resize();
        window.addEventListener('resize', resize);

        // initialize particles once
        const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
            x: Math.random() * canvas.offsetWidth,
            y: Math.random() * canvas.offsetHeight,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 0.5 + 0.2, // vertical movement speed
            drift: (Math.random() - 0.5) * 0.3, // horizontal drift
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            opacity: Math.random(),
        }));

        let rafId: number;

        const draw = () => {
            // clear frame
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

            particles.forEach((p) => {
                // update position
                p.y -= p.speed;
                p.x += p.drift;

                // subtle opacity oscillation for "breathing" effect
                p.opacity = Math.sin(p.y * 0.01) * 0.5 + 0.5;

                // recycle particle when it goes above viewport
                if (p.y < -10) {
                    p.y = canvas.offsetHeight + 10;
                    p.x = Math.random() * canvas.offsetWidth;
                }

                // draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);

                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.opacity;
                ctx.fill();
            });

            // reset alpha to avoid leaking into next frame
            ctx.globalAlpha = 1;

            rafId = requestAnimationFrame(draw);
        };

        // pause animation when canvas is not visible (optimization)
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    rafId = requestAnimationFrame(draw);
                } else {
                    cancelAnimationFrame(rafId);
                }
            },
            { threshold: 0 },
        );

        observer.observe(canvas);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
            }}
        />
    );
};
