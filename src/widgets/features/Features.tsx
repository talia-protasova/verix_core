import './features.scss';

import { FEATURES_DATA } from '../../app/core/data/features.data';
import { FEATURE_ICONS } from './features.icons';
import { FEATURE_THEME_COLORS } from './features.theme';

export const Features = () => {
    return (
        <section className='features section' aria-labelledby='features-title' id='features'>
            <div className='features__container container'>
                <header className='features__header section-header'>
                    <h2 className='features__eyebrow section-eyebrow'>Why Verix Core</h2>

                    <h3 id='features-title' className='features__title section-title'>
                        Infrastructure for the
                        <span className='text-gradient section-title--accent'>
                            {' '}
                            next generation
                        </span>
                    </h3>

                    <p className='features__description'>
                        Everything a modern App needs - speed, security, and intelligence, built at
                        the protocol level.
                    </p>
                </header>

                <ul className='features__grid'>
                    {FEATURES_DATA.map((feature, index) => {
                        const Icon = FEATURE_ICONS[feature.icon];
                        const color = FEATURE_THEME_COLORS[feature.theme];

                        return (
                            <li
                                key={feature.title}
                                className={`features__card reveal reveal-delay-${(index % 3) + 1}`}
                            >
                                <div
                                    className='features__icon'
                                    style={{ '--icon-color': color } as React.CSSProperties}
                                >
                                    <Icon size={52} color={color} />
                                </div>

                                <h4 className='features__title'>{feature.title}</h4>

                                <p className='features__description'>{feature.description}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};
