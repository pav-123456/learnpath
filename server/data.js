import { COURSES as BASE } from './courses.js';
import { MORE, NEW_COURSES } from './extra.js';

// Merge base courses with their extra questions and the new courses; give every question a stable id.
export const COURSES = [...BASE.map((c) => ({ ...c, quiz: [...c.quiz, ...(MORE[c.id] || [])] })), ...NEW_COURSES]
  .map((c) => ({ ...c, quiz: c.quiz.map((q, i) => ({ ...q, id: `${c.id}-${i}` })) }));
