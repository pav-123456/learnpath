import { useState, useEffect } from 'react';
import { api } from '../api';

export default function Leaderboard() {
  const [rows, setRows] = useState(null);
  useEffect(() => { api.leaderboard().then(setRows).catch(() => setRows([])); }, []);
  if (!rows || rows.length === 0) return null;
  return <div className="hero fade">
    <h3 style={{ margin: '0 0 8px' }}>🏆 Leaderboard</h3>
    {rows.map((r, k) => <div className={'lb' + (r.me ? ' me' : '')} key={k}>
      <span>{k + 1}. {r.name}{r.me && ' (you)'}</span><span>{r.points} pts · {r.lessons} lessons</span></div>)}
  </div>;
}
