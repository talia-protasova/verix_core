import './hero.scss';
import { HERO_DATA } from '../../app/core/data';
import { HeroVisual } from '../../shared/ui/Hero/HeroVisual';

export const Hero = () => {
    return (
        <section className='hero' aria-labelledby='hero-title'>
            <div className='hero__container container'>
                <div className='hero__content'>
                    <p className='hero__eyebrow'>
                        <span className='hero__eyebrow-dot' />
                        {HERO_DATA.eyebrow}
                    </p>

                    <h1 id='hero-title' className='hero__title'>
                        <span className='hero__title-line text-gradient'>
                            {HERO_DATA.title.line1}
                        </span>
                        <span className='hero__title-line'>{HERO_DATA.title.line2}</span>
                    </h1>

                    <p className='hero__description'>{HERO_DATA.description}</p>

                    <div className='hero__actions'>
                        {HERO_DATA.actions.map((action) => (
                            <button
                                key={action.label}
                                className={`button button--${action.variant}`}
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className='hero__visual'>
                <HeroVisual />
            </div>
        </section>
    );
};
