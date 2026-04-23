import type { EcosystemLayer } from '../../../widgets/ecosystem/ecosystem.model';

export const ECOSYSTEM_DATA: EcosystemLayer[] = [
    {
        id: 'protocol',
        title: 'Core Protocol',
        description: 'Consensus, execution, and base network layer',
        items: [
            { id: 'consensus', name: 'PoS Engine', hint: 'Validator coordination' },
            { id: 'execution', name: 'Execution VM', hint: 'Smart contract runtime' },
            { id: 'network', name: 'P2P Network', hint: 'Node communication' },
        ],
    },
    {
        id: 'infra',
        title: 'Infrastructure',
        description: 'Services that power apps and integrations',
        items: [
            { id: 'rpc', name: 'RPC Layer', hint: 'Public & private endpoints' },
            { id: 'indexer', name: 'Indexer', hint: 'Query blockchain data' },
            { id: 'oracle', name: 'Oracle', hint: 'External data feeds' },
        ],
    },
    {
        id: 'dev',
        title: 'Developer Platform',
        description: 'Tools for building and shipping products',
        items: [
            { id: 'sdk', name: 'SDK', hint: 'Client libraries' },
            { id: 'cli', name: 'CLI Tools', hint: 'Local workflows' },
            { id: 'studio', name: 'Contract Studio', hint: 'Deploy & debug' },
        ],
    },
    {
        id: 'apps',
        title: 'Applications',
        description: 'User-facing products built on top',
        items: [
            { id: 'defi', name: 'DeFi', hint: 'Trading & liquidity' },
            { id: 'ai', name: 'AI Agents', hint: 'On-chain intelligence' },
            { id: 'nft', name: 'Digital Assets', hint: 'Ownership layer' },
        ],
    },
];
