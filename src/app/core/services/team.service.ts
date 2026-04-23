import { TEAM_DATA } from '../data/team.data';
import type { TeamMember } from '../../../widgets/team/team.model';

export class TeamService {
    static async getTeam(): Promise<TeamMember[]> {
        // simulate async API request (mock layer)
        return new Promise((resolve) => {
            // small delay to trigger loading / skeleton states
            setTimeout(() => resolve(TEAM_DATA), 300);
        });
    }
}
