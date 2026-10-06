import { useState } from 'react';
import Progress from './Progress';
import Leaderboard from './Leaderboard';
import { pct } from '../utils/helpers';

export default function CourseList({ courses, state, onOpen, onRetry }) {
  const [q, setQ] = useState('');
  const { done, results } = state;
  const total = courses.reduce((n, c) => n + c.lessons.length, 0);
  const finished = courses.reduce((n, c) => n + (done[c.id] || []).length, 0);
  const overall = total ? Math.round((finished / total) * 100) : 0;
  const list = courses.filter((c) => (c.title + c.desc).toLowerCase().includes(q.toLowerCase()));
  return <div className="fade">
    <div className="hero">
      <h1>Learn one lesson at a time.</h1>
      <p>{finished} of {total} lessons completed across {courses.length} courses.</p>
      <Progress value={overall} big />
      <div className="meta"><span>Overall progress</span><span>{overall}%</span></div>
    </div>
    <Leaderboard />
    <input className="search" placeholder="Search courses" aria-label="Search courses" value={q} onChange={(e) => setQ(e.target.value)} />
    {list.length === 0 ? <div className="state"><div className="emoji">🔍</div><h3>No courses match "{q}"</h3><p>Try a different keyword or clear the search.</p>
      <button className="btn ghost" onClick={() => setQ('')}>Clear search</button></div> :
      <div className="grid">{list.map((c) => {
        const p = pct(c, done), r = results[c.id];
        return <button key={c.id} className="card" onClick={() => onOpen(c.id)}>
          <span className="emoji">{c.emoji}</span><h3>{c.title}</h3><p>{c.desc}</p>
          <div><span className="chip">{c.level}</span>{' '}{p === 100 && <span className="chip done">Completed</span>}{' '}{r && <span className="chip">Best quiz {r.best}/{r.total}</span>}</div>
          <Progress value={p} /><div className="meta"><span>{(done[c.id] || []).length}/{c.lessons.length} lessons</span><span>{p}%</span></div>
        </button>; })}</div>}
  </div>;
}
