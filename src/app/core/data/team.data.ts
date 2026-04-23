import type { TeamMember } from '../../../widgets/team/team.model';
import { AvatarService } from '../services/avatar.service';

export const TEAM_DATA: TeamMember[] = [
    {
        id: 'alex',
        name: 'Alex Mercer',
        role: 'Co-Founder & CEO',
        bio: 'ex-Google Brain, distributed systems, scaling infra to millions of users',
        avatar: AvatarService.getAvatarUrl('Alex Mercer'),
    },
    {
        id: 'priya',
        name: 'Priya Nair',
        role: 'Co-Founder & CTO',
        bio: 'ex-Solana Labs, consensus & blockchain architecture',
        avatar: AvatarService.getAvatarUrl('Priya Nair'),
    },
    {
        id: 'daniel',
        name: 'Daniel Vogt',
        role: 'Head of AI',
        bio: 'ex-DeepMind, applied ML, real-time inference systems',
        avatar: AvatarService.getAvatarUrl('Daniel Vogt'),
    },
    {
        id: 'sofia',
        name: 'Sofia Crane',
        role: 'Head of Growth',
        bio: 'ex-Binance, product growth & ecosystem expansion',
        avatar: AvatarService.getAvatarUrl('Sofia Crane'),
    },
];
