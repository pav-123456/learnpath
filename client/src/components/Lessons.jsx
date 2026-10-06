import { useState } from 'react';

export default function Lessons({ course, done, toggle }) {
  const [open, setOpen] = useState(0);
  const d = done[course.id] || [];
  return <div>{course.lessons.map((l, i) => {
    const on = d.includes(i);
    return <div className="lesson" key={i}>
      <button className="lesson-h" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
        <span className={'tick' + (on ? ' on' : '')}>{on ? '✓' : ''}</span><b>{l.t}</b>
      </button>
      {open === i && <div className="lesson-b fade"><p>{l.c}</p>
        <button className={'btn' + (on ? ' ghost' : '')} onClick={() => toggle(course.id, i)}>{on ? 'Mark as incomplete' : 'Mark as completed'}</button></div>}
    </div>; })}</div>;
}
