import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Mail, MapPin, ExternalLink, FileText, Menu, X, Send, ArrowRight,
  Server, Shield, Database, Cloud, Activity, FlaskConical, Sparkles, GraduationCap, Heart,
} from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import Shades from "./Shades";
import { profile, stats, experience, projects, skills, education } from "./data";

// EmailJS: set these in a .env file (VITE_EMAILJS_SERVICE_ID, etc.).
// Without them, the form opens the visitor's email app instead.
const EMAILJS = {
  service: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  key: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

const NAV = [
  { id: "work", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
];

const SKILL_ICONS = {
  "Core": Server,
  "Auth & Security": Shield,
  "Data": Database,
  "Cloud & Ops": Cloud,
  "Observability": Activity,
  "Testing": FlaskConical,
  "AI-Assisted Dev": Sparkles,
};

const initials = profile.name.split(" ").map((w) => w[0]).join("");

function Nav({ onContact }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#top" className="monogram" aria-label="Back to top">{initials}</a>
        <nav className={open ? "links open" : "links"}>
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}>{n.label}</a>
          ))}
        </nav>
        <button className="btn-outline" onClick={onContact}>Contact Me</button>
        <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  const [cool, setCool] = useState(false);
  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <button
          type="button"
          className={cool ? "avatar cool" : "avatar"}
          onClick={() => setCool((c) => !c)}
          aria-label="Put on sunglasses"
          aria-pressed={cool}
        >
          {profile.photo ? <img src={profile.photo} alt={profile.name} /> : <span>{initials}</span>}
          {profile.photo && (
            <span className="shades-wrap" style={{ top: profile.shades.top, left: profile.shades.left, width: profile.shades.width }}>
              <Shades className="shades" />
            </span>
          )}
        </button>
        <h1 className="hero-text">
          Hey, I'm <span className="green">{profile.name}</span>. {profile.intro}
        </h1>
        <div className="hero-meta">
          <span className="meta-item"><MapPin size={18} /> {profile.location}</span>
          <span className="pill-green"><span className="dot" /> Open to opportunities</span>
        </div>
        <div className="hero-actions">
          <a className="chunky" href="resume.pdf" target="_blank" rel="noreferrer"><FileText size={18} /> Resume</a>
          <a className="chunky icon" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={20} /></a>
          <a className="chunky icon" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></a>
          <a className="chunky icon" href={`mailto:${profile.email}`} aria-label="Email"><Mail size={20} /></a>
        </div>
      </div>
    </section>
  );
}

function Preview({ p }) {
  if (p.image) return <img className="shot-img" src={p.image} alt={`${p.name} screenshot`} />;
  return (
    <div className="shot-mock" style={{ "--tint": p.color }}>
      <div className="mock-nav"><span /><span /><span /></div>
      <div className="mock-title">{p.name}</div>
      <div className="mock-line w70" />
      <div className="mock-line w50" />
      <div className="mock-chips">
        {p.stack.slice(0, 3).map((s) => <span key={s}>{s}</span>)}
      </div>
    </div>
  );
}

function FeaturedWork() {
  return (
    <section className="band-dark" id="work">
      <div className="wrap">
        <h2 className="title-light">Featured Work</h2>
        <div className="showcase">
          {projects.map((p) => {
            const Tag = p.live ? "a" : "div";
            const linkProps = p.live ? { href: p.live, target: "_blank", rel: "noreferrer" } : {};
            return (
              <article key={p.name} className="show-card">
                <Tag className="show-link" {...linkProps}>
                  <div className="browser">
                    <div className="browser-bar">
                      <i /><i /><i />
                      <span className="url">{p.url}</span>
                    </div>
                    <div className="browser-view"><Preview p={p} /></div>
                  </div>
                  <div className="show-panel" style={{ background: p.color }}>
                    <h3>{p.name}</h3>
                    <p>{p.tagline}</p>
                  </div>
                </Tag>
                <div className="show-foot">
                  <span className={`badge ${p.status === "live" ? "live" : p.status === "work" ? "work" : "wip"}`}>
                    {p.status === "live" ? "Live" : p.status === "work" ? "Work project" : "In progress"}
                  </span>
                  <span className="foot-links">
                    {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" aria-label={`${p.name} source code`}><Github size={18} /></a>}
                    {p.live && <a href={p.live} target="_blank" rel="noreferrer" aria-label={`Open ${p.name}`}><ExternalLink size={18} /></a>}
                  </span>
                </div>
                <p className="show-desc">{p.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section" id="experience">
      <div className="wrap">
        <h2 className="title">Experience</h2>
        <p className="lead">4+ years building production backends at Oracle Health, EY, and Pfizer.</p>
        <div className="stats">
          {stats.map((s) => (
            <div key={s.label} className="card stat">
              <div className="stat-num">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="timeline">
          {experience.map((job) => (
            <article key={job.company} className="card job">
              <div className="job-head">
                <div>
                  <h3>{job.company}</h3>
                  <p className="role">{job.title}</p>
                </div>
                <span className="pill-gray">{job.period} · {job.location}</span>
              </div>
              <ul className="bullets">
                {job.points.map((pt) => <li key={pt}>{pt}</li>)}
              </ul>
              <div className="chips">
                {job.stack.map((s) => <span key={s} className="chip">{s}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section alt" id="skills">
      <div className="wrap">
        <h2 className="title">Skills</h2>
        <p className="lead">The tools I reach for every day.</p>
        <div className="skill-grid">
          {Object.entries(skills).map(([cat, list]) => {
            const Icon = SKILL_ICONS[cat] || Server;
            return (
              <div key={cat} className="card skill">
                <h3><span className="skill-icon"><Icon size={18} /></span>{cat}</h3>
                <div className="chips">
                  {list.map((s) => <span key={s} className="chip">{s}</span>)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section" id="about">
      <div className="wrap narrow">
        <h2 className="title">A bit about me</h2>
        <div className="about-text">
          {profile.summary.map((p) => <p key={p}>{p}</p>)}
        </div>
        <div className="edu">
          {education.map((e) => (
            <div key={e.degree} className="card edu-card">
              <GraduationCap size={22} className="green" />
              <div>
                <h3>{e.degree}</h3>
                <p>{e.school}</p>
                <p className="muted">{e.period}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactModal({ open, onClose }) {
  const formRef = useRef(null);
  const [state, setState] = useState("idle");

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    setState("idle");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(formRef.current);
    if (!EMAILJS.service || !EMAILJS.template || !EMAILJS.key) {
      const subject = encodeURIComponent(`Portfolio message from ${fd.get("from_name")}`);
      const body = encodeURIComponent(`${fd.get("message")}\n\n${fd.get("from_name")} (${fd.get("reply_to")})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }
    setState("sending");
    try {
      await emailjs.sendForm(EMAILJS.service, EMAILJS.template, formRef.current, { publicKey: EMAILJS.key });
      setState("sent");
      formRef.current.reset();
    } catch {
      setState("error");
    }
  };

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal card" role="dialog" aria-modal="true" aria-labelledby="contact-title">
        <button className="close" onClick={onClose} aria-label="Close"><X size={20} /></button>
        <h2 id="contact-title">Let's talk</h2>
        <p className="muted">Hiring for a Node.js or full-stack role, or have a question? Send me a note.</p>
        <form ref={formRef} onSubmit={onSubmit} className="form">
          <label htmlFor="c-name">Your Name</label>
          <input id="c-name" name="from_name" required autoFocus />
          <label htmlFor="c-email">Your Email</label>
          <input id="c-email" name="reply_to" type="email" required />
          <label htmlFor="c-msg">Your Message</label>
          <textarea id="c-msg" name="message" rows={5} required />
          <button className="chunky green-btn" type="submit" disabled={state === "sending"}>
            <Send size={17} /> {state === "sending" ? "Sending..." : "Send Message"}
          </button>
          {state === "sent" && <p className="ok">Message sent. I'll get back to you soon.</p>}
          {state === "error" && <p className="err">Couldn't send. Email me at {profile.email}.</p>}
        </form>
        <p className="direct muted">Or reach me directly: <strong>{profile.email}</strong> · <strong>{profile.phone}</strong></p>
      </div>
    </div>
  );
}

export default function App() {
  const [contact, setContact] = useState(false);
  return (
    <>
      <Nav onContact={() => setContact(true)} />
      <main>
        <Hero />
        <FeaturedWork />
        <Experience />
        <Skills />
        <About />
      </main>
      <footer className="footer">
        <div className="wrap foot-inner">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span className="foot-social">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={20} /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={20} /></a>
          </span>
          <button className="foot-cta" onClick={() => setContact(true)}>Let's work together <ArrowRight size={18} /></button>
        </div>
        <p className="made">Made with <Heart size={14} className="heart" /> in {profile.location}</p>
      </footer>
      <ContactModal open={contact} onClose={() => setContact(false)} />
    </>
  );
}
