import { useEffect, useState } from 'react';
import './team.scss';

import type { TeamMember } from './team.model';
import { TeamService } from '../../app/core/services/team.service';
import { TeamCard } from './TeamCard';
import { createTeamSkeletonData, getTeamItemClassName } from './team.helpers';

const TEAM_SKELETON_COUNT = 4;
const TEAM_ANIMATION_STEP = 0.08;

export const Team = () => {
    // main data source
    const [team, setTeam] = useState<TeamMember[]>([]);
    // loading state for skeletons
    const [isLoading, setIsLoading] = useState(true);
    // controls reveal animation after data is ready
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // guard against state updates after unmount
        let isMounted = true;

        const loadTeam = async () => {
            try {
                // fetch team data (mocked / async)
                const data = await TeamService.getTeam();

                if (!isMounted) {
                    return;
                }

                setTeam(data);
                setIsLoading(false);

                // defer visibility to next frame for smoother transition
                requestAnimationFrame(() => {
                    if (isMounted) {
                        setIsVisible(true);
                    }
                });
            } catch {
                // fallback: stop loading even if request failed
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadTeam();

        return () => {
            isMounted = false;
        };
    }, []);

    // switch between skeleton data and real data
    const displayData = isLoading ? createTeamSkeletonData(TEAM_SKELETON_COUNT) : team;

    return (
        <section className='team' aria-labelledby='team-title' id='team'>
            <div className='team__container container'>
                <header className='team__header'>
                    <span className='section-eyebrow'>Team</span>

                    <h2 id='team-title' className='section-title'>
                        Built by people who{' '}
                        <span className='text-gradient section-title--accent'>
                            ship real systems
                        </span>
                    </h2>
                </header>

                <ul className='team__list'>
                    {displayData.map((member, index) => {
                        const titleId = `team-${member.id}`;

                        return (
                            <li
                                key={member.id}
                                className={getTeamItemClassName(isLoading, isVisible)}
                                style={
                                    !isLoading
                                        ? ({
                                              '--team-delay': `${index * TEAM_ANIMATION_STEP}s`,
                                          } as React.CSSProperties)
                                        : undefined
                                }
                            >
                                <TeamCard member={member} isLoading={isLoading} titleId={titleId} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};
