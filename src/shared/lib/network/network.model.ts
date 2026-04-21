export interface Point {
    x: number;
    y: number;
    phase: number;
}

export interface NodeData {
    el: SVGCircleElement;
    baseX: number;
    baseY: number;
    currX: number;
    currY: number;
    phase: number;
    glowPhase: number;
}

export interface EdgeData {
    el: SVGPathElement;
    u: number;
    v: number;
}
