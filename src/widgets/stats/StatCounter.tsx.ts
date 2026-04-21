import { useEffect, useMemo, useRef, useState } from 'react';

type Suffix = 'K' | 'M' | '%' | null;

interface ParsedValue {
    number: number;
    suffix: Suffix;
}

/**
 * Extract numeric value and suffix from string
 * e.g. "120K" → { number: 120, suffix: 'K' }
 */
const parseValue = (value: string): ParsedValue => {
    const number = parseFloat(value.replace(/[^0-9.]/g, ''));

    let suffix: Suffix = null;

    if (value.includes('K')) suffix = 'K';
    else if (value.includes('M')) suffix = 'M';
    else if (value.includes('%')) suffix = '%';

    return { number, suffix };
};

/**
 * Format animated value back to original representation
 */
const formatValue = (count: number, suffix: Suffix): string => {
    return suffix ? `${count}${suffix}` : `${count}`;
};

/**
 * Animates numeric value when element enters viewport
 */
export const useCounter = (value: string) => {
    const [count, setCount] = useState(0);

    // DOM reference for IntersectionObserver
    const ref = useRef<HTMLElement | null>(null);

    // Prevents animation from running multiple times
    const started = useRef(false);

    /**
     * Parse value once per change
     * Used both for animation target and display formatting
     */
    const parsed = useMemo(() => parseValue(value), [value]);

    useEffect(() => {
        const { number: target } = parsed;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || started.current) return;

                started.current = true;

                const duration = 1600;
                const startTime = performance.now();

                /**
                 * Animation loop using requestAnimationFrame
                 * Ease-out cubic curve for smoother finish
                 */
                const animate = (now: number) => {
                    const progress = Math.min((now - startTime) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);

                    setCount(Math.floor(eased * target));

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        setCount(target);
                    }
                };

                requestAnimationFrame(animate);
            },
            { threshold: 0.5 },
        );

        const el = ref.current;
        if (el) observer.observe(el);

        return () => observer.disconnect();
    }, [parsed]);

    return {
        ref,
        display: formatValue(count, parsed.suffix),
    };
};
