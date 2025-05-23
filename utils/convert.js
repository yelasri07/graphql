export function convertXPToReadable(xp) {
    if (xp < 1000) {
        return `${xp} B`;
    } else if (xp < 1000000) {
        const kb = Math.round((xp / 1000));
        return `${kb} KB`;
    } else {
        const mb = (xp / 1000000).toFixed(2);
        return `${mb} MB`;
    }
}