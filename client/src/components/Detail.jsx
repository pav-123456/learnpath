import { useState } from 'react';
import Progress from './Progress';
import Lessons from './Lessons';
import Quiz from './Quiz';
import { pct } from '../utils/helpers';

export default function Detail({ course, state, toggle, onResult, onBack }) {
  const [tab, setTab] = useState('lessons');
  const p = pct(course, state.done);
  return <div className="fade">
    <button className="back" onClick={onBack}>← All courses</button>
    <div className="hero">
      <span className="emoji">{course.emoji}</span>
      <h1>{course.title}</h1><p>{course.desc}</p>
      <Progress value={p} big /><div className="meta"><span>{(state.done[course.id] || []).length} of {course.lessons.length} lessons</span><span>{p}%</span></div>
    </div>
    <div className="tabs" role="tablist">
      <button className="tab" role="tab" aria-selected={tab === 'lessons'} onClick={() => setTab('lessons')}>Lessons</button>
      <button className="tab" role="tab" aria-selected={tab === 'quiz'} onClick={() => setTab('quiz')}>Quiz</button>
    </div>
    {tab === 'lessons' ? <Lessons course={course} done={state.done} toggle={toggle} /> :
      <div><p style={{ color: 'var(--mute)', marginTop: 0 }}>{course.size} random questions from a bank of {course.bank}, 30 seconds each. Options are shuffled every attempt.</p>
        <QuizGate course={course} onResult={onResult} /></div>}
  </div>;
}

function QuizGate({ course, onResult }) {
  const [started, setStarted] = useState(false);
  return started ? <Quiz course={course} onResult={onResult} /> : <button className="btn" onClick={() => setStarted(true)}>Start quiz</button>;
}
