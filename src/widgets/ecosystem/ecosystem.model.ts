export interface EcosystemLayer {
    id: string;
    title: string;
    description: string;
    items: EcosystemItem[];
}

export interface EcosystemItem {
    id: string;
    name: string;
    hint: string;
}
