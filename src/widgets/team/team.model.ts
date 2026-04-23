export interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    avatar?: string;
    social?: {
        twitter?: string;
        github?: string;
        linkedin?: string;
    };
}
