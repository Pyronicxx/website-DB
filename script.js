let seededRandom = (seed, x) => {
    let X = Math.floor(x);
    let t = x - X;
    let fade = t ** 3 * (t * (t * 6 - 15) + 10);
    let hash = i => {
        let h = i + seed * 374761393;
        h = (h ^ h >> 13) * 1274126177;
        h ^= h >> 16;
        return ((h >>> 0) / 42949) % 1;
    };
    let mix = i => {
        // add some nonlinearity via multiple octaves
        let a = hash(i);
        let b = hash(i * 1.3);
        let c = hash(i * 2.7);
        return (a + 0.5 * b + 0.25 * c) / 1.75; // normalize
    };
    let lerp = (a, b, u) => a + (b - a) * u;
    return lerp(mix(X), mix(X + 1), fade);
};
