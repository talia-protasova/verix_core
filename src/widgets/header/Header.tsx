import './header.scss';
import { NAV_LINKS, SOCIAL_LINKS } from '../../app/core/data';
import { SocialIcon } from '../../shared/ui/icon/SocialIcon';
import { useEffect, useState } from 'react';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }, [isOpen]);

    useEffect(() => {
        const sections = document.querySelectorAll<HTMLElement>('section[id]');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(`#${entry.target.id}`);
                    }
                });
            },
            {
                rootMargin: '-40% 0px -50% 0px',
            },
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <header className='header'>
                <div className='header__container'>
                    <div className='header__logo text-gradient'>Verix Core</div>

                    <nav className='header__nav' aria-label='Main navigation'>
                        <ul className='header__menu'>
                            {NAV_LINKS.map((link) => (
                                <li key={link.id}>
                                    <a
                                        href={link.href}
                                        className={`header__link ${
                                            activeSection === link.href
                                                ? 'header__link--active'
                                                : ''
                                        }`}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className='header__right'>
                        <div className='header__socials'>
                            {SOCIAL_LINKS.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className='header__social-link'
                                    aria-label={item.label}
                                >
                                    <SocialIcon name={item.name} className='header__icon' />
                                </a>
                            ))}
                        </div>

                        <button className='button button--brand header__cta'>Launch App</button>

                        <button
                            className={`header__burger ${isOpen ? 'is-active' : ''}`}
                            onClick={() => setIsOpen(!isOpen)}
                            aria-controls='mobile-menu'
                            aria-expanded={isOpen}
                            aria-label='Menu'
                        >
                            <span />
                            <span />
                            <span />
                        </button>
                    </div>
                </div>
            </header>

            <div className={`mobile-menu ${isOpen ? 'is-open' : ''}`} id='mobile-menu'>
                <button
                    className='mobile-menu__close'
                    onClick={() => setIsOpen(false)}
                    aria-label='Close menu'
                >
                    ✕
                </button>

                <nav className='mobile-menu__nav'>
                    {NAV_LINKS.map((link, i) => (
                        <a
                            key={link.id}
                            href={link.href}
                            className={`mobile-menu__link ${
                                activeSection === link.href ? 'mobile-menu__link--active' : ''
                            }`}
                            style={{ transitionDelay: `${i * 0.08}s` }}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className='mobile-menu__footer'>
                    <button className='button button--brand'>Launch App</button>
                </div>
            </div>
        </>
    );
};
