export const isEmail = (value: string): boolean => {
    if (!value) {
        return false;
    }

    const email = value.trim();

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);
};
