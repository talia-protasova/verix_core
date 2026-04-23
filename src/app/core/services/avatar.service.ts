const UI_AVATARS_BASE = 'https://ui-avatars.com/api/';

export interface AvatarOptions {
    size?: number;
    background?: string;
    color?: string;
    rounded?: boolean;
}

export class AvatarService {
    static getAvatarUrl(name: string, options: AvatarOptions = {}) {
        // normalize input to avoid empty or invalid values
        const safeName = name?.trim() || 'User';

        const { size = 256, background = 'random', color = 'ffffff', rounded = true } = options;

        // build query params for avatar API
        const params = new URLSearchParams({
            name: safeName,
            size: String(size),
            background,
            color,
            rounded: String(rounded),
            format: 'svg',
        });

        // final avatar URL
        return `${UI_AVATARS_BASE}?${params.toString()}`;
    }
}
