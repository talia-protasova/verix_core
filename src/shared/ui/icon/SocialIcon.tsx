import { type IconProps } from './social-icon.model';

export const SocialIcon = ({ name, className, label }: IconProps) => {
    return (
        <svg
            className={`icon ${className ?? ''}`}
            aria-hidden={label ? undefined : true}
            aria-label={label}
            focusable='false'
        >
            <use href={`${import.meta.env.BASE_URL}assets/sprite.svg#${name}`} />
        </svg>
    );
};
