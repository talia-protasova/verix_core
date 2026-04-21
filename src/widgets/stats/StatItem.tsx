import { useCounter } from './StatCounter.tsx';
import type { StatItem as StatItemType } from './stats.model';

export const StatItem = ({ value, label }: StatItemType) => {
    const { ref, display } = useCounter(value);

    return (
        <li className='stats__item reveal'>
            <div className='stats__value text-gradient'>
                <span ref={ref}>{display}</span>
            </div>

            <div className='stats__label'>{label}</div>
        </li>
    );
};
