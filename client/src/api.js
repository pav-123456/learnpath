const TOKEN = 'learnpath-token';
export const getToken = () => { try { return localStorage.getItem(TOKEN); } catch (e) { return null; } };
export const setToken = (t) => { try { t ? localStorage.setItem(TOKEN, t) : localStorage.removeItem(TOKEN); } catch (e) {} };

async function req(path, { method = 'GET', body } = {}) {
  const t = getToken();
  const r = await fetch('/api' + path, {
    method,
    headers: { 'Content-Type': 'application/json', ...(t ? { Authorization: 'Bearer ' + t } : {}) },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
  return data;
}

export const api = {
  register: (b) => req('/auth/register', { method: 'POST', body: b }),
  login: (b) => req('/auth/login', { method: 'POST', body: b }),
  courses: () => req('/courses'),
  quiz: (cid) => req(`/courses/${cid}/quiz`),
  leaderboard: () => req('/leaderboard'),
  progress: () => req('/me/progress'),
  toggle: (cid, i) => req(`/me/progress/${cid}/lessons/${i}`, { method: 'PUT' }),
  submitQuiz: (cid, answers) => req(`/courses/${cid}/quiz`, { method: 'POST', body: { answers } })
};
