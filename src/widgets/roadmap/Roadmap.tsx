import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useId, useLayoutEffect, useRef, useState } from 'react';

import { ROADMAP_DATA } from '../../app/core/data/roadmap.data';
import { buildRoadmapPath, getRoadmapPoints } from './roadmap-path.util';
import './roadmap.scss';

export const Roadmap = () => {
    // container for layout measurements
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    // refs to each step card (used to calculate positions)
    const stepRefs = useRef<Array<HTMLElement | null>>([]);

    // SVG path + viewport
    const [svgPath, setSvgPath] = useState('');
    const [viewBox, setViewBox] = useState('0 0 100 100');

    // accessibility - reduced motion
    const prefersReducedMotion = useReducedMotion();

    // unique gradient id (prevents collisions)
    const gradientId = useId();

    // scroll progress relative to roadmap section
    const { scrollYProgress } = useScroll({
        target: wrapperRef,
        offset: ['start 85%', 'end center'],
    });

    // slightly extend range so animation completes nicely
    const adjustedProgress = useTransform(scrollYProgress, [0, 1], [0, 1.1]);

    // smooth animation for path drawing
    const animatedPathLength = useSpring(adjustedProgress, {
        stiffness: 40,
        damping: 18,
    });

    useLayoutEffect(() => {
        // guard for SSR or unsupported environments
        if (typeof window === 'undefined' || typeof ResizeObserver === 'undefined') {
            return;
        }

        // calculates SVG path based on current layout
        const calculatePath = () => {
            requestAnimationFrame(() => {
                const wrapper = wrapperRef.current;
                const cards = stepRefs.current.filter(Boolean) as HTMLElement[];

                if (!wrapper || !cards.length) {
                    return;
                }

                const wrapperRect = wrapper.getBoundingClientRect();

                const width = wrapperRect.width;
                const height = wrapperRect.height;
                const centerX = width / 2;

                const isMobile = window.innerWidth < 1024;

                setViewBox(`0 0 ${width} ${height}`);

                const points = getRoadmapPoints(cards, wrapperRect, centerX, isMobile);

                const path = buildRoadmapPath(points, centerX, width, isMobile);

                setSvgPath(path);
            });
        };

        // initial calculation
        calculatePath();

        // observe layout changes
        const resizeObserver = new ResizeObserver(calculatePath);

        const wrapper = wrapperRef.current;

        if (wrapper) {
            resizeObserver.observe(wrapper);
        }

        stepRefs.current.forEach((el) => {
            if (el) {
                resizeObserver.observe(el);
            }
        });

        // fallback for viewport resize
        window.addEventListener('resize', calculatePath);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', calculatePath);
        };
    }, []);

    return (
        <section className='roadmap' aria-labelledby='roadmap-title' id='roadmap'>
            <div className='roadmap__container container'>
                <header className='roadmap__header'>
                    <h2 className='section-eyebrow'>Roadmap</h2>
                    <h3 id='roadmap-title' className='section-title'>
                        Building in public,{' '}
                        <span className='text-gradient section-title--accent'>shipping fast</span>
                    </h3>
                </header>

                <div className='roadmap__wrapper' ref={wrapperRef}>
                    <svg
                        className='roadmap__canvas'
                        viewBox={viewBox}
                        aria-hidden='true'
                        focusable='false'
                    >
                        <defs>
                            <linearGradient id={gradientId} x1='0%' y1='0%' x2='100%' y2='100%'>
                                <stop offset='0%' stopColor='var(--grad-pink)' />
                                <stop offset='50%' stopColor='var(--grad-violet)' />
                                <stop offset='100%' stopColor='var(--grad-cyan)' />
                            </linearGradient>
                        </defs>

                        <path d={svgPath} className='roadmap__path roadmap__path--bg' />

                        <motion.path
                            d={svgPath}
                            className='roadmap__path roadmap__path--active'
                            style={{
                                pathLength: prefersReducedMotion ? 1 : animatedPathLength,
                                stroke: `url(#${gradientId})`,
                            }}
                        />
                    </svg>

                    <ol className='roadmap__list'>
                        {ROADMAP_DATA.map((item, index) => {
                            const isLeft = index % 2 === 0;

                            const stepTitleId = `roadmap-step-title-${index}`;

                            const statusClass = `roadmap__card--${item.status}`;

                            return (
                                <li
                                    key={`${item.quarter}-${item.title}`}
                                    className={`roadmap__step ${
                                        isLeft ? 'roadmap__step--left' : 'roadmap__step--right'
                                    }`}
                                >
                                    <motion.article
                                        ref={(el) => {
                                            stepRefs.current[index] = el;
                                        }}
                                        className={`roadmap__card ${statusClass}`}
                                        aria-labelledby={stepTitleId}
                                        initial={
                                            prefersReducedMotion ? false : { opacity: 0, y: 24 }
                                        }
                                        whileInView={
                                            prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                                        }
                                        viewport={{ once: true, amount: 0.3 }}
                                    >
                                        <p className='roadmap__quarter'>{item.quarter}</p>

                                        <h3 id={stepTitleId} className='roadmap__title'>
                                            {item.title}
                                        </h3>

                                        <p className='roadmap__description'>{item.description}</p>

                                        <ul
                                            className='roadmap__tags'
                                            aria-label={`${item.title} tags`}
                                        >
                                            {item.tags.map((tag) => (
                                                <li key={tag} className='roadmap__tag'>
                                                    {tag}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.article>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        </section>
    );
};
