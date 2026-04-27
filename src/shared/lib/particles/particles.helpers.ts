import type { Particle } from './particles.model';

const COLORS = ['#e040fb', '#7c3aed', '#06b6d4'];

const random = (min: number, max: number) => Math.random() * (max - min) + min;

// create particle dataset
export const createParticles = (count: number): Particle[] => {
    return Array.from({ length: count }).map((_, i) => ({
        id: i,
        size: random(1, 4),
        left: random(0, 100),
        bottom: random(0, 100),
        delay: random(0, 5),
        duration: random(5, 15),
        drift: random(-50, 50),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
};
