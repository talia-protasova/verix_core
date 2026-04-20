import { type Point } from './network.model';
export const generatePoints = (count: number, width: number, height: number): Point[] => {
    const points: Point[] = [];
    const rows = 5;
    const cols = Math.ceil(count / rows);
    const cellWidth = width / cols;
    const cellHeight = height / rows;

    for (let i = 0; i < count; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        points.push({
            x: col * cellWidth + cellWidth / 2 + (Math.random() - 0.5) * (cellWidth * 0.7),
            y: row * cellHeight + cellHeight / 2 + (Math.random() - 0.5) * (cellHeight * 0.7),
            phase: Math.random() * Math.PI * 2,
        });
    }
    return points;
};

export const generateConnections = (
    points: Point[],
    maxConnections: number,
    maxDistance: number,
): [number, number][] => {
    const connections: [number, number][] = [];
    const maxDistanceSq = maxDistance * maxDistance;

    for (let i = 0; i < points.length; i++) {
        const neighbors: { index: number; distSq: number }[] = [];
        for (let j = 0; j < points.length; j++) {
            if (i === j) continue;
            const dx = points[i].x - points[j].x;
            const dy = points[i].y - points[j].y;
            const distSq = dx * dx + dy * dy;

            if (distSq < maxDistanceSq) {
                neighbors.push({ index: j, distSq });
            }
        }

        neighbors.sort((a, b) => a.distSq - b.distSq);
        neighbors.slice(0, maxConnections).forEach((neighbor) => {
            if (i < neighbor.index) {
                connections.push([i, neighbor.index]);
            }
        });
    }
    return connections;
};
