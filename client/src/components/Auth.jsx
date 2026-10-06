import { useState } from 'react';
import { api, setToken } from '../api';

export default function Auth({ onAuth }) {
  const [mode, setMode] = useState('login');
  const [f, setF] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr('');
    try {
      const r = await (mode === 'login' ? api.login(f) : api.register(f));
      setToken(r.token);
      onAuth(r.user);
    } catch (x) { setErr(x.message); } finally { setBusy(false); }
  };

  return <div className="hero auth fade">
    <h1>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
    <p>Your lesson progress and quiz scores are saved to your account.</p>
    <form onSubmit={submit}>
      {mode === 'register' && <input className="search" placeholder="Full name" aria-label="Full name" value={f.name} onChange={set('name')} required />}
      <input className="search" type="email" placeholder="Email" aria-label="Email" value={f.email} onChange={set('email')} required />
      <input className="search" type="password" placeholder="Password (6+ characters)" aria-label="Password" value={f.password} onChange={set('password')} required />
      {err && <p className="err" role="alert">{err}</p>}
      <button className="btn" disabled={busy}>{busy ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Sign up'}</button>{' '}
      <button type="button" className="btn ghost" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setErr(''); }}>
        {mode === 'login' ? 'New here? Sign up' : 'Have an account? Log in'}</button>
    </form>
  </div>;
}
