export const pct = (c, done) => Math.round(((done[c.id] || []).length / c.lessons.length) * 100);
export const fmt = (s) => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
