import './footer.scss';
import { SocialIcon } from '../../shared/ui/icon/SocialIcon';
import { SOCIAL_LINKS, FOOTER_LINKS, FOOTER_LEGAL } from '../../app/core/data';

export const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer__container container'>
                <div className='footer__grid'>
                    <div className='footer__brand'>
                        <div className='footer__logo text-gradient'>Verix Core</div>

                        <p className='footer__description'>
                            A fast blockchain with scalable AI. Built for the next generation of
                            decentralised applications.
                        </p>

                        <ul className='footer__socials' aria-label='Social links'>
                            {SOCIAL_LINKS.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        className='footer__social-link'
                                        aria-label={item.label}
                                    >
                                        <SocialIcon name={item.name} className='footer__icon' />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='footer__nav-wrap'>
                        {FOOTER_LINKS.map((section) => (
                            <nav
                                key={section.title}
                                className='footer__nav'
                                aria-label={section.ariaLabel}
                            >
                                <h2 className='footer__title'>{section.title}</h2>

                                <ul className='footer__list'>
                                    {section.links.map((link) => (
                                        <li key={link.label}>
                                            <a href={link.href} className='footer__link'>
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        ))}
                    </div>
                </div>

                <div className='footer__bottom'>
                    <p className='footer__copyright'>© {new Date().getFullYear()} Verix Core</p>

                    <ul className='footer__legal' aria-label='Legal'>
                        {FOOTER_LEGAL.map((item) => (
                            <li key={item.label}>
                                <a href={item.href} className='footer__legal-link'>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
};
