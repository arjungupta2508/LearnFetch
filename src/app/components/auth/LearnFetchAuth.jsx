import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lf-root {
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: #f0eef9;
  }

  /* ── Left panel ── */
  .lf-panel {
    position: relative;
    background: linear-gradient(145deg, #5b21b6 0%, #7c3aed 40%, #a855f7 70%, #ec4899 100%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 40px;
    overflow: hidden;
  }
  .lf-panel::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(236,72,153,0.3) 0%, transparent 50%);
  }
  .lf-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.25;
  }
  .lf-blob-1 { width: 300px; height: 300px; background: #fff; top: -80px; left: -80px; }
  .lf-blob-2 { width: 200px; height: 200px; background: #f0abfc; bottom: 60px; right: -40px; }

  .lf-brand {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    color: white;
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.5px;
  }
  .lf-brand-icon {
    width: 42px; height: 42px;
    background: rgba(255,255,255,0.2);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
  }

  .lf-panel-body { position: relative; }
  .lf-panel-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.25);
    color: white;
    font-size: 12px;
    font-weight: 600;
    padding: 6px 14px;
    border-radius: 999px;
    margin-bottom: 24px;
    letter-spacing: 0.3px;
  }
  .lf-panel-headline {
    font-size: clamp(26px, 2.8vw, 36px);
    font-weight: 800;
    color: white;
    line-height: 1.2;
    letter-spacing: -1px;
    margin-bottom: 16px;
  }
  .lf-panel-sub {
    font-size: 15px;
    color: rgba(255,255,255,0.75);
    line-height: 1.6;
    max-width: 320px;
    margin-bottom: 40px;
  }
  .lf-stats { display: flex; gap: 32px; }
  .lf-stat-num { font-size: 24px; font-weight: 800; color: white; letter-spacing: -0.5px; }
  .lf-stat-label { font-size: 12px; color: rgba(255,255,255,0.6); font-weight: 500; margin-top: 2px; }

  .lf-panel-footer {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .lf-avatars { display: flex; }
  .lf-avatar {
    width: 32px; height: 32px;
    border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.4);
    margin-left: -8px;
    font-size: 14px;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,0.2);
  }
  .lf-avatar:first-child { margin-left: 0; }
  .lf-footer-text { font-size: 13px; color: rgba(255,255,255,0.7); font-weight: 500; }
  .lf-footer-text strong { color: white; }

  /* ── Form side ── */
  .lf-form-side {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 32px;
    background: #f0eef9;
    overflow-y: auto;
  }
  .lf-card {
    width: 100%;
    max-width: 420px;
    animation: lf-up 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  @keyframes lf-up {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .lf-tabs {
    display: flex;
    background: white;
    border-radius: 14px;
    padding: 4px;
    margin-bottom: 28px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  }
  .lf-tab {
    flex: 1; padding: 10px;
    border: none; background: transparent;
    border-radius: 11px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px; font-weight: 600;
    color: #9ca3af; cursor: pointer;
    transition: all 0.2s;
  }
  .lf-tab.active {
    background: linear-gradient(135deg, #7c3aed, #a855f7);
    color: white;
    box-shadow: 0 4px 12px rgba(124,58,237,0.35);
  }

  .lf-heading { font-size: 26px; font-weight: 800; color: #1e1b4b; letter-spacing: -0.5px; margin-bottom: 6px; }
  .lf-subheading { font-size: 14px; color: #9ca3af; margin-bottom: 28px; line-height: 1.5; }

  .lf-social {
    width: 100%; padding: 12px 16px;
    background: white;
    border: 1.5px solid #e5e7eb;
    border-radius: 12px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px; font-weight: 600; color: #374151;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    transition: all 0.2s; margin-bottom: 20px;
  }
  .lf-social:hover { border-color: #7c3aed; box-shadow: 0 2px 12px rgba(124,58,237,0.1); transform: translateY(-1px); }
  .lf-g-icon {
    width: 18px; height: 18px;
    border-radius: 50%;
    background: conic-gradient(#4285f4 0deg 90deg, #34a853 90deg 180deg, #fbbc05 180deg 270deg, #ea4335 270deg);
    display: flex; align-items: center; justify-content: center;
    color: white; font-size: 9px; font-weight: 900;
  }

  .lf-divider {
    display: flex; align-items: center; gap: 12px;
    font-size: 12px; font-weight: 600; color: #d1d5db; margin-bottom: 20px;
  }
  .lf-divider::before, .lf-divider::after { content: ''; flex: 1; height: 1px; background: #e5e7eb; }

  .lf-field { margin-bottom: 16px; }
  .lf-field-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
  .lf-label { display: block; font-size: 13px; font-weight: 700; color: #374151; margin-bottom: 6px; }
  .lf-label-sm { font-size: 13px; font-weight: 700; color: #374151; }
  .lf-input {
    width: 100%; padding: 12px 16px;
    background: white; border: 1.5px solid #e5e7eb; border-radius: 12px;
    font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; color: #1f2937;
    outline: none; transition: all 0.2s;
  }
  .lf-input::placeholder { color: #d1d5db; }
  .lf-input:focus { border-color: #7c3aed; box-shadow: 0 0 0 3px rgba(124,58,237,0.1); }

  .lf-forgot { font-size: 12px; font-weight: 700; color: #7c3aed; background: none; border: none; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; padding: 0; }
  .lf-forgot:hover { text-decoration: underline; }

  .lf-bars { display: flex; gap: 4px; margin-top: 8px; }
  .lf-bar { flex: 1; height: 3px; border-radius: 999px; background: #e5e7eb; transition: background 0.3s; }
  .lf-bar.weak   { background: #ef4444; }
  .lf-bar.fair   { background: #f59e0b; }
  .lf-bar.strong { background: #10b981; }
  .lf-bar-label  { font-size: 11px; font-weight: 600; margin-top: 4px; color: #9ca3af; }

  .lf-check-row { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 20px; }
  .lf-check-row input { accent-color: #7c3aed; width: 15px; height: 15px; margin-top: 2px; flex-shrink: 0; cursor: pointer; }
  .lf-check-label { font-size: 13px; color: #6b7280; line-height: 1.5; }
  .lf-check-label a { color: #7c3aed; font-weight: 700; text-decoration: none; }
  .lf-check-label a:hover { text-decoration: underline; }

  .lf-error { background: #fef2f2; border: 1px solid #fecaca; border-radius: 10px; padding: 10px 14px; font-size: 13px; color: #dc2626; margin-bottom: 16px; }
  .lf-success-msg { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 10px 14px; font-size: 13px; color: #16a34a; margin-bottom: 16px; }

  .lf-btn {
    width: 100%; padding: 14px;
    background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
    color: white; border: none; border-radius: 12px;
    font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; font-weight: 700;
    cursor: pointer; transition: all 0.2s; letter-spacing: 0.2px;
  }
  .lf-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(124,58,237,0.4); }
  .lf-btn:active:not(:disabled) { transform: translateY(0); }
  .lf-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .lf-switch { text-align: center; margin-top: 20px; font-size: 13px; color: #9ca3af; }
  .lf-switch button { color: #7c3aed; font-weight: 700; background: none; border: none; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; }
  .lf-switch button:hover { text-decoration: underline; }

  .lf-back { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; color: #7c3aed; background: none; border: none; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; padding: 0; margin-bottom: 24px; }
  .lf-back:hover { text-decoration: underline; }

  .lf-success-icon { width: 64px; height: 64px; background: linear-gradient(135deg, #7c3aed, #a855f7); border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 28px; margin-bottom: 20px; box-shadow: 0 8px 24px rgba(124,58,237,0.35); }
  .lf-success-note { background: #f3f0ff; border: 1px solid #ddd6fe; border-radius: 12px; padding: 14px 16px; font-size: 13px; color: #6d28d9; margin-bottom: 24px; line-height: 1.5; }

  @media (max-width: 768px) {
    .lf-root { grid-template-columns: 1fr; }
    .lf-panel { display: none; }
    .lf-form-side { padding: 32px 20px; }
  }
`;

function getStrength(pw) {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}
const LABELS = ["", "Weak", "Fair", "Good", "Strong"];
const CLASSES = ["", "weak", "fair", "fair", "strong"];

function Panel() {
  return (
    <div className="lf-panel">
      <div className="lf-blob lf-blob-1" />
      <div className="lf-blob lf-blob-2" />
      <div className="lf-brand">
        <div className="lf-brand-icon">📚</div>
        LearnFetch
      </div>
      <div className="lf-panel-body">
        <div className="lf-panel-tag">🚀 Your Learning Hub</div>
        <h2 className="lf-panel-headline">Find Learning Resources in One Place</h2>
        <p className="lf-panel-sub">Search across videos, PDFs, and articles from multiple sources. Save and organize your favorite learning materials.</p>
        <div className="lf-stats">
          <div><div className="lf-stat-num">50K+</div><div className="lf-stat-label">Resources</div></div>
          <div><div className="lf-stat-num">12K+</div><div className="lf-stat-label">Learners</div></div>
          <div><div className="lf-stat-num">4.9★</div><div className="lf-stat-label">Rating</div></div>
        </div>
      </div>
      <div className="lf-panel-footer">
        <div className="lf-avatars">
          {["👩","👨","🧑","👩‍💻"].map((e,i) => <div className="lf-avatar" key={i}>{e}</div>)}
        </div>
        <div className="lf-footer-text">Join <strong>12,000+</strong> learners today</div>
      </div>
    </div>
  );
}

function Login({ onForgot, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError("");
    if (!email || !password) return setError("Please fill in all fields.");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    // on success → App.tsx onAuthStateChange fires → your real app loads automatically
  };

  return (
    <>
      <h1 className="lf-heading">Welcome back 👋</h1>
      <p className="lf-subheading">Sign in to continue to LearnFetch.</p>
      <div className="lf-tabs">
        <button className="lf-tab active">Sign In</button>
        <button className="lf-tab" onClick={onSwitch}>Sign Up</button>
      </div>
      <div className="lf-divider">sign in with email</div>
      {error && <div className="lf-error">⚠️ {error}</div>}
      <div className="lf-field">
        <label className="lf-label">Email address</label>
        <input className="lf-input" type="email" placeholder="you@example.com"
          value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="lf-field">
        <div className="lf-field-row">
          <label className="lf-label-sm">Password</label>
          <button className="lf-forgot" onClick={onForgot}>Forgot password?</button>
        </div>
        <input className="lf-input" type="password" placeholder="••••••••"
          value={password} onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && submit()} />
      </div>
      <button className="lf-btn" onClick={submit} disabled={loading} style={{marginTop:8}}>
        {loading ? "Signing in…" : "Sign In →"}
      </button>
      <div className="lf-switch">Don't have an account? <button onClick={onSwitch}>Sign up free</button></div>
    </>
  );
}

function Signup({ onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const strength = getStrength(password);

  const submit = async () => {
    setError("");
    if (!name || !email || !password) return setError("Please fill in all fields.");
    if (strength < 2) return setError("Please choose a stronger password.");
    if (!agreed) return setError("You must agree to the terms.");
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
    setLoading(false);
    if (error) setError(error.message);
    else setSuccess(true);
  };

  if (success) return (
    <>
      <div className="lf-success-icon">✉️</div>
      <h1 className="lf-heading">Confirm your email</h1>
      <p className="lf-subheading">We sent a confirmation link to <strong style={{color:'#1e1b4b'}}>{email}</strong>. Click it to activate your account.</p>
      <div className="lf-success-note">Didn't get it? Check your spam folder.</div>
      <button className="lf-btn" onClick={onSwitch}>Back to Sign In</button>
    </>
  );

  return (
    <>
      <h1 className="lf-heading">Create account ✨</h1>
      <p className="lf-subheading">Start discovering resources tailored to you.</p>
      <div className="lf-tabs">
        <button className="lf-tab" onClick={onSwitch}>Sign In</button>
        <button className="lf-tab active">Sign Up</button>
      </div>
      <div className="lf-divider">sign up with email</div>
      {error && <div className="lf-error">⚠️ {error}</div>}
      <div className="lf-field">
        <label className="lf-label">Full name</label>
        <input className="lf-input" type="text" placeholder="Jane Doe"
          value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div className="lf-field">
        <label className="lf-label">Email address</label>
        <input className="lf-input" type="email" placeholder="you@example.com"
          value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="lf-field">
        <label className="lf-label">Password</label>
        <input className="lf-input" type="password" placeholder="Min. 8 characters"
          value={password} onChange={e => setPassword(e.target.value)} />
        {password && (
          <>
            <div className="lf-bars">
              {[1,2,3,4].map(i => <div key={i} className={`lf-bar ${i <= strength ? CLASSES[strength] : ""}`} />)}
            </div>
            <div className="lf-bar-label">{LABELS[strength]} password</div>
          </>
        )}
      </div>
      <div className="lf-check-row">
        <input type="checkbox" id="lf-terms" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
        <label className="lf-check-label" htmlFor="lf-terms">
          I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
        </label>
      </div>
      <button className="lf-btn" onClick={submit} disabled={loading || !agreed}>
        {loading ? "Creating account…" : "Create Account →"}
      </button>
      <div className="lf-switch">Already have an account? <button onClick={onSwitch}>Sign in</button></div>
    </>
  );
}

function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError("");
    if (!email) return setError("Please enter your email address.");
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });
    setLoading(false);
    if (error) setError(error.message);
    else setSent(true);
  };

  if (sent) return (
    <>
      <button className="lf-back" onClick={onBack}>← Back to sign in</button>
      <div className="lf-success-icon">📬</div>
      <h1 className="lf-heading">Check your inbox</h1>
      <p className="lf-subheading">We sent a reset link to <strong style={{color:'#1e1b4b'}}>{email}</strong>.</p>
      <div className="lf-success-note">Didn't get it? Check your spam folder. The link expires in 1 hour.</div>
      <button className="lf-btn" onClick={() => { setSent(false); setEmail(""); }}>Try a different email</button>
      <div className="lf-switch">Remembered it? <button onClick={onBack}>Sign in</button></div>
    </>
  );

  return (
    <>
      <button className="lf-back" onClick={onBack}>← Back to sign in</button>
      <h1 className="lf-heading">Forgot password? 🔐</h1>
      <p className="lf-subheading">Enter your email and we'll send you a reset link.</p>
      {error && <div className="lf-error">⚠️ {error}</div>}
      <div className="lf-field">
        <label className="lf-label">Email address</label>
        <input className="lf-input" type="email" placeholder="you@example.com"
          value={email} onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === "Enter" && submit()} />
      </div>
      <button className="lf-btn" onClick={submit} disabled={loading} style={{marginTop:8}}>
        {loading ? "Sending…" : "Send Reset Link →"}
      </button>
      <div className="lf-switch">Remembered it? <button onClick={onBack}>Sign in</button></div>
    </>
  );
}

export default function LearnFetchAuth() {
  const [view, setView] = useState("login");
  return (
    <div className="lf-root">
      <style>{css}</style>
      <Panel />
      <div className="lf-form-side">
        <div className="lf-card">
          {view === "login"  && <Login  onForgot={() => setView("forgot")} onSwitch={() => setView("signup")} />}
          {view === "signup" && <Signup onSwitch={() => setView("login")} />}
          {view === "forgot" && <ForgotPassword onBack={() => setView("login")} />}
        </div>
      </div>
    </div>
  );
}