export const loadTheme = () => { try { return localStorage.getItem('learnpath-theme'); } catch (e) { return null; } };
export const saveTheme = (t) => { try { localStorage.setItem('learnpath-theme', t); } catch (e) {} };
