export type RoadmapPoint = {
    x: number;
    y: number;
    side: 'left' | 'right';
};

// builds SVG path string connecting roadmap points
// supports two modes: mobile with straight vertical line, and desktop with smooth "snake" with bezier curves
export const buildRoadmapPath = (
    points: RoadmapPoint[],
    centerX: number,
    width: number,
    isMobile: boolean,
): string => {
    // nothing to draw
    if (!points.length) return '';

    // single vertical line through center
    if (isMobile) {
        let path = `M ${centerX} ${points[0].y}`;

        for (let i = 1; i < points.length; i++) {
            path += ` L ${centerX} ${points[i].y}`;
        }

        return path;
    }

    // start from first point
    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const current = points[i];

        // vertical midpoint between segments
        const midY = (prev.y + current.y) / 2;

        // control points push curve toward center axis
        const prevCtrlX = prev.side === 'left' ? centerX - width * 0.08 : centerX + width * 0.08;

        const currentCtrlX =
            current.side === 'left' ? centerX - width * 0.08 : centerX + width * 0.08;

        //  smooth transition between cards
        path += `
            C ${prevCtrlX} ${prev.y},
              ${prevCtrlX} ${midY},
              ${centerX} ${midY}
            C ${currentCtrlX} ${midY},
              ${currentCtrlX} ${current.y},
              ${current.x} ${current.y}
        `;
    }

    return path;
};

// calculates anchor points for each roadmap card
// positions depend on layout mode: mobile where all points centered, desktop  with alternating left/right sides
export const getRoadmapPoints = (
    cards: HTMLElement[],
    wrapperRect: DOMRect,
    centerX: number,
    isMobile: boolean,
) => {
    return cards.map((card, index) => {
        const rect = card.getBoundingClientRect();

        const isLeft = index % 2 === 0;

        // x position:
        // mobile is always center
        // desktop - aligned to card edge (left or right)
        const x = isMobile
            ? centerX
            : isLeft
              ? rect.right - wrapperRect.left
              : rect.left - wrapperRect.left;

        // y position - vertical center of card relative to wrapper
        const y = rect.top - wrapperRect.top + rect.height / 2;

        return {
            x,
            y,
            side: isLeft ? 'left' : 'right',
        } as const;
    });
};
