import { useRef, useEffect } from 'react';
import type { GenerativeIconProps } from './types';

const DEFAULT_COLOR = 'rgba(255,255,255,0.6)';

const HEX_SIDES = 6;
const TIME_STEP = 0.05;

const BASE_RADIUS = 0.18;
const WAVE_AMPLITUDE = 0.06;
const RADIUS_OFFSET = 0.1;
const PHASE_SHIFT = 0.8;

const LINE_WIDTH = 1.5;

const fadeColor = (color: string, alpha: number) => {
    if (!color.includes('rgba')) return color;
    return color.replace(/[\d.]+\)$/g, `${alpha})`);
};

export const PulseHexagon: React.FC<GenerativeIconProps> = ({
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

        // scale canvas to avoid blur on high-DPI
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        let time = 0;

        const drawHex = (radius: number) => {
            ctx.beginPath();

            for (let i = 0; i < HEX_SIDES; i++) {
                // hexagon step = 60deg
                const angle = (i * Math.PI) / 3;

                const x = center + radius * Math.cos(angle);
                const y = center + radius * Math.sin(angle);

                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }

            ctx.closePath();
            ctx.stroke();
        };

        const animate = () => {
            ctx.clearRect(0, 0, size, size);

            time += TIME_STEP;

            for (let i = 0; i < 3; i++) {
                // radius = base + sinus wave + layer offset
                const radius =
                    size * BASE_RADIUS +
                    Math.sin(time - i * PHASE_SHIFT) * (size * WAVE_AMPLITUDE) +
                    i * (size * RADIUS_OFFSET);

                const alpha = 1 - i * 0.3;

                ctx.strokeStyle = fadeColor(color, alpha);
                ctx.lineWidth = LINE_WIDTH;

                drawHex(radius);
            }

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
