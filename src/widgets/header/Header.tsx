import './header.scss';
import { NAV_LINKS, SOCIAL_LINKS } from '../../app/core/data';
import { NavLink } from 'react-router-dom';
import { SocialIcon } from '../../shared/ui/icon/SocialIcon';
import { useEffect, useState } from 'react';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }, [isOpen]);

    return (
        <>
            <header className='header'>
                <div className='header__container'>
                    <div className='header__logo text-gradient'>Verix Core</div>

                    <nav className='header__nav' aria-label='Main navigation'>
                        <ul className='header__menu'>
                            {NAV_LINKS.map((link) => (
                                <li key={link.label}>
                                    <NavLink
                                        to={link.href}
                                        className={({ isActive }) =>
                                            `header__link ${isActive ? 'header__link--active' : ''}`
                                        }
                                    >
                                        {link.label}
                                    </NavLink>
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
                            aria-label='Menu'
                            aria-expanded={isOpen}
                        >
                            <span />
                            <span />
                            <span />
                        </button>
                    </div>
                </div>
            </header>

            <div className={`mobile-menu ${isOpen ? 'is-open' : ''}`}>
                <button
                    className='mobile-menu__close'
                    onClick={() => setIsOpen(false)}
                    aria-label='Close menu'
                >
                    ✕
                </button>

                <nav className='mobile-menu__nav'>
                    {NAV_LINKS.map((link, i) => (
                        <NavLink
                            key={link.label}
                            to={link.href}
                            className='mobile-menu__link'
                            style={{ transitionDelay: `${i * 0.08}s` }}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div className='mobile-menu__footer'>
                    <button className='button button--brand'>Launch App</button>
                </div>
            </div>
        </>
    );
};
