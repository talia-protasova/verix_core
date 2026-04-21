import {
    PlasmaSphere,
    OrbitConcentric,
    DataStream,
    NeuralNetwork,
    FloatingCubes,
    PulseHexagon,
} from '../../shared/ui/GenerativeIcon';

import type { GenerativeIconProps } from '../../shared/ui/GenerativeIcon';
import type { FeatureIconKey } from './features.model';

export const FEATURE_ICONS: Record<FeatureIconKey, React.FC<GenerativeIconProps>> = {
    plasma: PlasmaSphere,
    neural: NeuralNetwork,
    orbit: OrbitConcentric,
    cubes: FloatingCubes,
    data: DataStream,
    hex: PulseHexagon,
};
