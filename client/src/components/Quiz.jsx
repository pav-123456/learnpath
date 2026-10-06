import { useState, useEffect, useRef } from 'react';
import Progress from './Progress';
import { api } from '../api';
import { fmt } from '../utils/helpers';

export default function Quiz({ course, onResult }) {
  const [qs, setQs] = useState(null);
  const [ans, setAns] = useState([]); // chosen option text per question
  const [i, setI] = useState(0);
  const [left, setLeft] = useState(0);
  const [fin, setFin] = useState(false);
  const [res, setRes] = useState(null);
  const [error, setError] = useState('');
  const sent = useRef(false);

  // Each attempt fetches a fresh random set of questions from the server.
  const start = () => {
    setQs(null); setError(''); setRes(null); setFin(false); setI(0); sent.current = false;
    api.quiz(course.id).then((d) => {
      setQs(d.questions); setAns(Array(d.questions.length).fill(null)); setLeft(d.questions.length * d.secondsPerQuestion);
    }).catch((e) => setError(e.message));
  };
  useEffect(start, []);

  useEffect(() => {
    if (!qs || fin) return;
    const t = setInterval(() => setLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [qs, fin]);
  useEffect(() => { if (qs && left <= 0 && !fin) setFin(true); }, [left, fin, qs]);

  const submit = () => {
    setError('');
    api.submitQuiz(course.id, qs.map((q, k) => ({ id: q.id, choice: ans[k] })))
      .then((r) => { setRes(r); onResult(r.result); }).catch((e) => setError(e.message));
  };
  useEffect(() => { if (fin && !sent.current) { sent.current = true; submit(); } }, [fin]);

  if (error) return <div className="state"><h3>Something went wrong</h3><p>{error}</p><button className="btn" onClick={fin ? submit : start}>Try again</button></div>;
  if (!qs) return <div className="state" aria-busy="true">Loading questions…</div>;

  if (fin) {
    if (!res) return <div className="state" aria-busy="true">Scoring your answers…</div>;
    const answered = ans.filter((a) => a !== null).length;
    const ratio = res.score / res.total;
    return <div className="fade">
      <p className="score">{res.score}/{res.total}</p>
      <p style={{ margin: 0 }}>{ratio >= 0.8 ? 'Excellent work!' : ratio >= 0.5 ? 'Good effort, keep going.' : 'Review the lessons and try again.'}</p>
      <div className="stats"><span className="chip done">{res.score} correct</span><span className="chip">{answered - res.score} incorrect</span><span className="chip">{res.total - answered} unanswered</span>
        <span className="chip">Best {res.result.best}/{res.total}</span>
        {res.result.attempts.length > 1 && <span className="chip">Recent: {res.result.attempts.map((a) => a.score).join(', ')}</span>}</div>
      {res.review.map((r, k) => <div key={r.id} className={'rev ' + (r.ok ? 'ok' : 'bad')}>
        <b>{k + 1}. {r.q}</b>
        <div>Your answer: {r.chosen === null ? 'No answer' : r.chosen}</div>
        {!r.ok && <div>Correct answer: {r.correct}</div>}</div>)}
      <button className="btn" onClick={start}>Retry with new questions</button>
    </div>;
  }

  const q = qs[i];
  return <div className="fade" key={i}>
    <div className="qhead"><span className="chip">Question {i + 1} of {qs.length}</span>
      <span className={'timer' + (left <= 20 ? ' low' : '')}>⏱ {fmt(Math.max(left, 0))}</span></div>
    <Progress value={(ans.filter((a) => a !== null).length / qs.length) * 100} />
    <div className="dots">{qs.map((_, k) => <button key={k} aria-label={'Go to question ' + (k + 1)}
      className={'dot' + (k === i ? ' cur' : ans[k] !== null ? ' ans' : '')} onClick={() => setI(k)}>{k + 1}</button>)}</div>
    <h3 style={{ margin: '8px 0 12px' }}>{q.q}</h3>
    {q.o.map((o) => <button key={o} className={'opt' + (ans[i] === o ? ' sel' : '')}
      onClick={() => setAns(ans.map((a, n) => (n === i ? o : a)))}>{o}</button>)}
    <div className="nav">
      <button className="btn ghost" disabled={i === 0} onClick={() => setI(i - 1)}>Previous</button>
      {i < qs.length - 1 ? <button className="btn" onClick={() => setI(i + 1)}>Next</button>
        : <button className="btn" onClick={() => setFin(true)}>Finish quiz</button>}
    </div>
  </div>;
}
