import type { Variants } from 'framer-motion';

// container controls staggered reveal of layers
export const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

// each layer fades + lifts slightly
export const layerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
};

// chips scale in with spring for subtle tactile feel
export const chipVariants: Variants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { type: 'spring', stiffness: 260, damping: 20 },
    },
};
