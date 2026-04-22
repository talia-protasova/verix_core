export type RoadmapStatus = 'done' | 'active' | 'planned';

export interface RoadmapItem {
    quarter: string;
    title: string;
    description: string;
    tags: string[];
    status: RoadmapStatus;
}
