import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './ecosystem.scss';
import { ECOSYSTEM_DATA } from '../../app/core/data/ecosystem.data';
import { containerVariants, layerVariants, chipVariants } from './ecosystem.animations';
import { applyCursorSpotlight } from './cursor-spotlight.util';

export const Ecosystem: React.FC = () => {
    const prefersReducedMotion = useReducedMotion();

    // avoid running motion for users who prefer reduced motion
    const motionSafe = !prefersReducedMotion;

    // tracks cursor position inside card for spotlight effect
    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const { currentTarget, clientX, clientY } = e;

        // get element bounds
        const rect = currentTarget.getBoundingClientRect();

        // calculate cursor position relative to element
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // update CSS variables used in gradient
        applyCursorSpotlight(currentTarget, x, y);
    };

    return (
        <section className='ecosystem' aria-labelledby='ecosystem-title' id='ecosystem'>
            <div className='ecosystem__container container'>
                <header className='ecosystem__header'>
                    <h2 className='section-eyebrow'>Ecosystem</h2>

                    <h3 id='ecosystem-title' className='section-title'>
                        Structured for scale{' '}
                        <span className='text-gradient section-title--accent'>built in layers</span>
                    </h3>

                    <p className='ecosystem__description'>
                        From protocol to applications — each layer is designed to evolve
                        independently while staying deeply connected.
                    </p>
                </header>

                <motion.ul
                    className='ecosystem__layers'
                    role='list'
                    variants={motionSafe ? containerVariants : undefined}
                    initial={motionSafe ? 'hidden' : false}
                    whileInView={motionSafe ? 'visible' : undefined}
                    viewport={{ once: true }}
                >
                    {ECOSYSTEM_DATA.map((layer) => {
                        const layerTitleId = `ecosystem-layer-${layer.id}`;

                        return (
                            <motion.li
                                key={layer.id}
                                className='ecosystem__layer'
                                variants={motionSafe ? layerVariants : undefined}
                            >
                                <article
                                    className='ecosystem__layer-card'
                                    aria-labelledby={layerTitleId}
                                    onMouseMove={handleMouseMove}
                                >
                                    <div className='ecosystem__layer-head'>
                                        <h4 id={layerTitleId} className='ecosystem__layer-title'>
                                            {layer.title}
                                        </h4>

                                        <p className='ecosystem__layer-description'>
                                            {layer.description}
                                        </p>
                                    </div>

                                    <motion.ul
                                        className='ecosystem__items'
                                        aria-label={`${layer.title} modules`}
                                        transition={
                                            motionSafe ? { staggerChildren: 0.05 } : undefined
                                        }
                                    >
                                        {layer.items.map((item) => (
                                            <motion.li
                                                key={item.id}
                                                variants={motionSafe ? chipVariants : undefined}
                                                whileHover={
                                                    motionSafe ? { y: -3, scale: 1.02 } : undefined
                                                }
                                                className='ecosystem__item'
                                            >
                                                <div className='ecosystem__chip'>
                                                    <span className='ecosystem__chip-name'>
                                                        {item.name}
                                                    </span>

                                                    <span className='ecosystem__chip-hint'>
                                                        {item.hint}
                                                    </span>
                                                </div>
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </article>
                            </motion.li>
                        );
                    })}
                </motion.ul>
            </div>
        </section>
    );
};
