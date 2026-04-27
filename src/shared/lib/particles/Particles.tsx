import React, { useMemo } from 'react';
import './particles.scss';

import { createParticles } from './particles.helpers';

const PARTICLE_COUNT = 26;

export const Particles = () => {
    // generate once to avoid re-renders changing layout
    const particles = useMemo(() => createParticles(PARTICLE_COUNT), []);

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
            }}
        >
            {particles.map((p) => (
                <div
                    key={p.id}
                    className='particle'
                    style={
                        {
                            // horizontal position
                            left: `${p.left}%`,

                            // vertical start point
                            bottom: `${p.bottom}%`,

                            // particle size
                            width: `${p.size}px`,
                            height: `${p.size}px`,

                            // color + glow
                            background: p.color,
                            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,

                            // custom css var for drift animation
                            '--drift': `${p.drift}px`,

                            // animation timing
                            animationDuration: `${p.duration}s`,
                            animationDelay: `${p.delay}s`,
                        } as React.CSSProperties
                    }
                />
            ))}
        </div>
    );
};
