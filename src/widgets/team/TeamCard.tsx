import { useState } from 'react';

import type { TeamMember } from './team.model';
import { getTeamInitials } from './team.helpers';

interface TeamCardProps {
    member: TeamMember;
    isLoading: boolean;
    titleId: string;
}

export const TeamCard = ({ member, isLoading, titleId }: TeamCardProps) => {
    // track avatar loading failure to fallback to initials
    const [hasAvatarError, setHasAvatarError] = useState(false);

    // derive initials once for fallback UI
    const initials = getTeamInitials(member.name);

    return (
        <article
            // skeleton state controlled via modifier class
            className={`team__card ${isLoading ? 'is-loading' : ''}`}
            // connect card with heading for accessibility
            aria-labelledby={titleId}
        >
            <div className='team__avatar'>
                {/* show avatar only when loaded and valid */}
                {!isLoading && member.avatar && !hasAvatarError ? (
                    <img
                        src={member.avatar}
                        // meaningful alt for screen readers
                        alt={`${member.name} avatar`}
                        className='team__avatar-img'
                        // defer loading for performance
                        loading='lazy'
                        width={88}
                        height={88}
                        // fallback to initials on error
                        onError={() => setHasAvatarError(true)}
                    />
                ) : (
                    // fallback avatar (initials or default)
                    <span className='team__avatar-fallback' aria-hidden='true'>
                        {initials || 'TM'}
                    </span>
                )}
            </div>

            <div className='team__content'>
                <h3 id={titleId} className='team__name'>
                    {member.name}
                </h3>

                <p className='team__role'>{member.role}</p>
                <p className='team__bio'>{member.bio}</p>
            </div>
        </article>
    );
};
