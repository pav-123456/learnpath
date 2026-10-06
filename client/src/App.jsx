import { useState, useEffect } from 'react';
import CourseList from './components/CourseList';
import Detail from './components/Detail';
import Auth from './components/Auth';
import { api, getToken, setToken } from './api';
import { loadTheme, saveTheme } from './utils/storage';

export default function App() {
  const [courses, setCourses] = useState(null);
  const [err, setErr] = useState(null);
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(!!getToken());
  const [state, setState] = useState({ done: {}, results: {} });
  const [theme, setTheme] = useState(loadTheme);
  const [view, setView] = useState(null);

  const loadCourses = () => { setErr(null); setCourses(null); api.courses().then(setCourses).catch((e) => setErr(e.message)); };
  const loadProgress = () => api.progress().then((p) => { setUser(p.user); setState({ done: p.done, results: p.results }); });

  useEffect(loadCourses, []);
  useEffect(() => {
    if (!getToken()) return;
    loadProgress().catch(() => setToken(null)).finally(() => setBooting(false));
  }, []);
  useEffect(() => { if (theme) document.documentElement.setAttribute('data-theme', theme); }, [theme]);

  const toggle = (cid, i) => api.toggle(cid, i)
    .then((r) => setState((s) => ({ ...s, done: { ...s.done, [cid]: r.done } }))).catch(() => {});
  const onResult = (cid) => (r) => setState((s) => ({ ...s, results: { ...s.results, [cid]: r } }));
  const logout = () => { setToken(null); setUser(null); setState({ done: {}, results: {} }); setView(null); };
  const dark = theme ? theme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  const flip = () => { const t = dark ? 'light' : 'dark'; setTheme(t); saveTheme(t); };
  const course = courses && view ? courses.find((c) => c.id === view) : null;
  const skeleton = <div className="grid" aria-busy="true">{[1, 2, 3, 4].map((n) => <div key={n} className="skel" />)}</div>;

  return <div className="wrap">
    <header>
      <button className="logo" onClick={() => setView(null)}>LearnPath</button>
      <div className="hdr">
        {user && <><span className="chip">Hi, {user.name.split(' ')[0]}</span><button className="btn ghost" onClick={logout}>Log out</button></>}
        <button className="btn ghost" onClick={flip} aria-label="Toggle dark mode">{dark ? '☀️' : '🌙'}</button>
      </div>
    </header>
    {booting ? skeleton
      : !user ? <Auth onAuth={(u) => { setUser(u); loadProgress(); }} />
      : err ? <div className="state"><div className="emoji">⚠️</div><h3>Couldn't load courses</h3><p>{err}. Check your connection and try again.</p><button className="btn" onClick={loadCourses}>Try again</button></div>
      : !courses ? skeleton
      : courses.length === 0 ? <div className="state"><div className="emoji">📚</div><h3>No courses yet</h3><p>New courses will show up here.</p></div>
      : course ? <Detail key={course.id} course={course} state={state} toggle={toggle} onResult={onResult(course.id)} onBack={() => setView(null)} />
      : <CourseList courses={courses} state={state} onOpen={setView} />}
  </div>;
}
