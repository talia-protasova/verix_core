export interface Point {
    x: number;
    y: number;
    phase: number;
}

export interface NodeData extends Point {
    el: SVGCircleElement;
    baseX: number;
    baseY: number;
    currX?: number;
    currY?: number;
    glowPhase: number;
}

export interface EdgeData {
    el: SVGPathElement;
    u: number;
    v: number;
}
