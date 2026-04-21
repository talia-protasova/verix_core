import React, { useMemo, useEffect, useRef } from 'react';

import type { NodeData, EdgeData } from '../../lib/network/network.model';
import { generatePoints, generateConnections } from '../../lib/network/network.utils';

import './hero-visual.scss';

// Canvas dimensions and network configuration
const WIDTH = 900;
const HEIGHT = 400;
const POINT_COUNT = 140;
const MAX_CONN_PER_POINT = 6;
const CONN_DISTANCE = 100;

// Animation constants
const SPEED = 0.0006;
const AMPLITUDE = 6;

export const HeroVisual: React.FC = () => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    // Generate static network topology once on mount
    const { points, connections } = useMemo(() => {
        const pts = generatePoints(POINT_COUNT, WIDTH, HEIGHT);
        const conns = generateConnections(pts, MAX_CONN_PER_POINT, CONN_DISTANCE);
        return { points: pts, connections: conns };
    }, []);

    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        // Bind DOM elements to their corresponding data for direct manipulation in rAF
        const nodesData: NodeData[] = Array.from(
            svg.querySelectorAll<SVGCircleElement>('.net-node'),
        ).map((el, i) => ({
            el,
            baseX: points[i].x,
            baseY: points[i].y,
            currX: points[i].x,
            currY: points[i].y,
            phase: points[i].phase,
            glowPhase: Math.random() * Math.PI * 2,
        }));

        // Map edges to node indices
        const edgesData: EdgeData[] = Array.from(
            svg.querySelectorAll<SVGPathElement>('.net-edge'),
        ).map((el) => ({
            el,
            u: Number(el.dataset.u),
            v: Number(el.dataset.v),
        }));

        // Render static state if user prefers reduced motion
        const renderStatic = () => {
            nodesData.forEach((node) => {
                node.el.setAttribute('cx', `${node.baseX}`);
                node.el.setAttribute('cy', `${node.baseY}`);
                node.el.setAttribute('r', '2.5');
                node.el.setAttribute('opacity', '0.8');
            });

            edgesData.forEach((edge) => {
                const from = nodesData[edge.u];
                const to = nodesData[edge.v];

                edge.el.setAttribute('d', `M${from.baseX},${from.baseY} L${to.baseX},${to.baseY}`);
            });
        };

        if (prefersReducedMotion.matches) {
            renderStatic();
            return;
        }

        let frameId: number;

        const animate = (time: number) => {
            // Animate each node: floating movement + glow pulse
            nodesData.forEach((node) => {
                node.currX = node.baseX + Math.sin(time * SPEED + node.phase) * AMPLITUDE;

                node.currY = node.baseY + Math.cos(time * SPEED * 1.3 + node.phase) * AMPLITUDE;

                node.el.setAttribute('cx', `${node.currX}`);
                node.el.setAttribute('cy', `${node.currY}`);

                const glow = (Math.sin(time * 0.003 + node.glowPhase) + 1) / 2;

                const radius = 1.2 + glow * 1.5;
                const opacity = 0.3 + glow * 0.5;

                node.el.setAttribute('r', `${radius}`);
                node.el.setAttribute('opacity', `${opacity}`);
            });

            // Redraw edges to follow their connected nodes each frame
            edgesData.forEach((edge) => {
                const from = nodesData[edge.u];
                const to = nodesData[edge.v];

                edge.el.setAttribute('d', `M${from.currX},${from.currY} L${to.currX},${to.currY}`);
            });

            frameId = requestAnimationFrame(animate);
        };

        frameId = requestAnimationFrame(animate);

        // Cleanup on unmount to prevent memory leaks
        return () => cancelAnimationFrame(frameId);
    }, [points]);

    return (
        <div className='hero-visual'>
            <div className='hero-visual__inner'>
                <svg ref={svgRef} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className='hero-visual__svg'>
                    <defs>
                        <linearGradient id='networkGradient'>
                            <stop offset='0%' stopColor='var(--grad-cyan)' />
                            <stop offset='33%' stopColor='var(--grad-blue)' />
                            <stop offset='66%' stopColor='var(--grad-violet)' />
                            <stop offset='100%' stopColor='var(--grad-pink)' />
                        </linearGradient>

                        <radialGradient id='edgeFade' cx='50%' cy='50%' r='70%'>
                            <stop offset='60%' stopColor='white' stopOpacity='1' />
                            <stop offset='100%' stopColor='white' stopOpacity='0' />
                        </radialGradient>

                        <mask id='networkMask'>
                            <rect width='100%' height='100%' fill='url(#edgeFade)' />
                        </mask>

                        <filter id='nodeBlur'>
                            <feGaussianBlur stdDeviation='1.2' />
                        </filter>
                    </defs>

                    <g mask='url(#networkMask)'>
                        <g stroke='url(#networkGradient)' strokeWidth='0.5' strokeOpacity='0.4'>
                            {connections.map(([u, v], i) => (
                                <path key={`e-${i}`} className='net-edge' data-u={u} data-v={v} />
                            ))}
                        </g>

                        <g fill='url(#networkGradient)' filter='url(#nodeBlur)'>
                            {points.map((_, i) => (
                                <circle key={`n-${i}`} className='net-node' r='2.5' />
                            ))}
                        </g>
                    </g>
                </svg>
            </div>
        </div>
    );
};
