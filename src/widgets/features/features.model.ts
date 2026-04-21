export type FeatureIconKey = 'plasma' | 'neural' | 'orbit' | 'cubes' | 'data' | 'hex';

export type FeatureTheme = 'violet' | 'blue' | 'cyan' | 'pink' | 'orange' | 'green';

export interface FeatureItem {
    icon: FeatureIconKey;
    title: string;
    description: string;
    theme: FeatureTheme;
}
