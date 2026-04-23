import type { TeamMember } from './team.model';

export const getTeamInitials = (name: string): string => {
    // extract first letters from name parts (max 2 chars)
    return name
        .trim()
        .split(/\s+/)
        .map((part) => part.charAt(0))
        .join('')
        .slice(0, 2)
        .toUpperCase();
};

export const createTeamSkeletonData = (count = 4): TeamMember[] => {
    // generate placeholder items for skeleton state
    return Array.from({ length: count }, (_, index) => ({
        id: `skeleton-${index}`,
        name: '',
        role: '',
        bio: '',
        avatar: '',
    }));
};

export const getTeamItemClassName = (isLoading: boolean, isVisible: boolean): string => {
    // compose BEM modifiers based on loading / animation state
    return ['team__item', !isLoading && 'team__item--loaded', isVisible && 'team__item--visible']
        .filter(Boolean)
        .join(' ');
};
