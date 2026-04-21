import { STATS_DATA } from '../../app/core/data/stats.data';
import { StatItem } from './StatItem';

import './stats.scss';

export const Stats = () => {
    return (
        <section className='stats' aria-label='Platform statistics' id='metrics'>
            <h2 className='sr-only'>Platform metrics</h2>
            <div className='stats__container'>
                <ul className='stats__grid'>
                    {STATS_DATA.map((item) => (
                        <StatItem key={item.label} value={item.value} label={item.label} />
                    ))}
                </ul>
            </div>
        </section>
    );
};
