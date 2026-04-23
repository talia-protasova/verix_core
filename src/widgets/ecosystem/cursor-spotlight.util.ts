export const applyCursorSpotlight = (element: HTMLElement, x: number, y: number) => {
    element.style.setProperty('--mouse-x', `${x}px`);
    element.style.setProperty('--mouse-y', `${y}px`);
};
