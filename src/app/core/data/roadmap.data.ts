import type { RoadmapItem } from '../../../widgets/roadmap/roadmap-item.model';

export const ROADMAP_DATA: RoadmapItem[] = [
    {
        quarter: 'Q1 2024',
        title: 'Genesis & Testnet',
        description:
            'Initial network bootstrapping, validator onboarding, and public testnet launch with core developer tooling.',
        tags: ['Testnet', 'SDK v1', 'Faucet', 'Explorer'],
        status: 'done',
    },
    {
        quarter: 'Q3 2024',
        title: 'Mainnet Alpha',
        description:
            'Mainnet launch with early validators, basic staking, and initial EVM compatibility for smart contracts.',
        tags: ['Mainnet', 'EVM', 'Staking', 'Bridge v1'],
        status: 'done',
    },
    {
        quarter: 'Q2 2026',
        title: 'AI & Security Layer',
        description:
            'Introduction of on-chain AI inference and automated smart contract security scanning as native protocol features.',
        tags: ['AI Nodes', 'Security Engine', 'Oracle v2'],
        status: 'active',
    },
    {
        quarter: 'Q1 2027',
        title: 'Ecosystem Expansion',
        description:
            'Launch of core DeFi primitives, NFT infrastructure, and a grants program to support ecosystem builders.',
        tags: ['DeFi', 'NFT', 'Grants', 'DAO'],
        status: 'planned',
    },
];
