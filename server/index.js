import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { COURSES } from './data.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = process.env.DB_FILE || path.join(__dirname, 'db.json');
const SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const PORT = process.env.PORT || 4000;

// Tiny JSON-file store. Swap read/write for MongoDB/Postgres calls to scale up.
const read = () => { try { return JSON.parse(fs.readFileSync(DB_FILE, 'utf8')); } catch (e) { return { users: [] }; } };
const write = (db) => fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));

const publicUser = (u) => ({ id: u.id, name: u.name, email: u.email });
const sign = (u) => jwt.sign({ id: u.id }, SECRET, { expiresIn: '7d' });
const findCourse = (id) => COURSES.find((c) => c.id === id);

function auth(req, res, next) {
  try {
    req.uid = jwt.verify((req.headers.authorization || '').replace('Bearer ', ''), SECRET).id;
    next();
  } catch (e) { res.status(401).json({ error: 'Please log in' }); }
}
// loads db + current user, or sends 401
function withUser(req, res) {
  const db = read();
  const user = db.users.find((u) => u.id === req.uid);
  if (!user) { res.status(401).json({ error: 'Please log in' }); return null; }
  return { db, user };
}

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password || password.length < 6)
    return res.status(400).json({ error: 'Name, email and a password of 6+ characters are required' });
  const db = read();
  const em = email.toLowerCase().trim();
  if (db.users.some((u) => u.email === em)) return res.status(409).json({ error: 'That email is already registered' });
  const user = { id: Date.now().toString(36), name: name.trim(), email: em, hash: bcrypt.hashSync(password, 10), done: {}, results: {} };
  db.users.push(user);
  write(db);
  res.status(201).json({ token: sign(user), user: publicUser(user) });
});

app.post('/api/auth/login', (req, res) => {
  const { email = '', password = '' } = req.body || {};
  const user = read().users.find((u) => u.email === email.toLowerCase().trim());
  if (!user || !bcrypt.compareSync(password, user.hash)) return res.status(401).json({ error: 'Wrong email or password' });
  res.json({ token: sign(user), user: publicUser(user) });
});

const QUIZ_SIZE = 8;
const SECONDS_PER_QUESTION = 30;
const shuffle = (a) => { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };

// Course list: the question bank is never sent, only its size.
app.get('/api/courses', (req, res) =>
  res.json(COURSES.map(({ quiz, ...c }) => ({ ...c, bank: quiz.length, size: Math.min(QUIZ_SIZE, quiz.length) }))));

// Each attempt gets a fresh random set of questions with shuffled options (answers are not included).
app.get('/api/courses/:cid/quiz', auth, (req, res) => {
  const course = findCourse(req.params.cid);
  if (!course) return res.status(404).json({ error: 'Course not found' });
  const questions = shuffle(course.quiz).slice(0, QUIZ_SIZE).map(({ id, q, o }) => ({ id, q, o: shuffle(o) }));
  res.json({ questions, secondsPerQuestion: SECONDS_PER_QUESTION });
});

app.get('/api/me/progress', auth, (req, res) => {
  const ctx = withUser(req, res);
  if (ctx) res.json({ user: publicUser(ctx.user), done: ctx.user.done, results: ctx.user.results });
});

app.put('/api/me/progress/:cid/lessons/:i', auth, (req, res) => {
  const course = findCourse(req.params.cid);
  const i = Number(req.params.i);
  if (!course || !Number.isInteger(i) || i < 0 || i >= course.lessons.length) return res.status(404).json({ error: 'Lesson not found' });
  const ctx = withUser(req, res);
  if (!ctx) return;
  const d = ctx.user.done[course.id] || [];
  ctx.user.done[course.id] = d.includes(i) ? d.filter((x) => x !== i) : [...d, i];
  write(ctx.db);
  res.json({ done: ctx.user.done[course.id] });
});

app.post('/api/courses/:cid/quiz', auth, (req, res) => {
  const course = findCourse(req.params.cid);
  if (!course) return res.status(404).json({ error: 'Course not found' });
  const answers = Array.isArray(req.body && req.body.answers) ? req.body.answers : [];
  if (!answers.length || answers.length > QUIZ_SIZE) return res.status(400).json({ error: 'Invalid submission' });
  const review = answers.map(({ id, choice }) => {
    const q = course.quiz.find((x) => x.id === id);
    if (!q) return null;
    const correct = q.o[q.a];
    return { id, q: q.q, chosen: choice == null ? null : choice, correct, ok: choice === correct };
  }).filter(Boolean);
  const score = review.filter((r) => r.ok).length;
  const ctx = withUser(req, res);
  if (!ctx) return;
  const prev = ctx.user.results[course.id] || {};
  const attempts = [...(prev.attempts || []), { score, total: review.length, at: Date.now() }].slice(-5);
  ctx.user.results[course.id] = { last: score, total: review.length, best: Math.max(score, prev.best || 0), attempts };
  write(ctx.db);
  res.json({ score, total: review.length, review, result: ctx.user.results[course.id] });
});

app.get('/api/leaderboard', auth, (req, res) => {
  const rows = read().users.map((u) => ({
    name: u.name.split(' ')[0],
    points: Object.values(u.results).reduce((n, r) => n + r.best, 0),
    lessons: Object.values(u.done).reduce((n, d) => n + d.length, 0),
    me: u.id === req.uid
  })).sort((a, b) => b.points - a.points || b.lessons - a.lessons).slice(0, 10);
  res.json(rows);
});

// In production the same server also serves the built React app.
const dist = path.join(__dirname, '../client/dist');
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get('*', (req, res) => res.sendFile(path.join(dist, 'index.html')));
}

app.listen(PORT, () => console.log('LearnPath running on port ' + PORT));
