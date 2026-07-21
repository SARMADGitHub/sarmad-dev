import { createFileRoute } from "@tanstack/react-router";
import profileAsset from "@/assets/sarmad-profile-3.jpg.asset.json";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Github, Linkedin, Mail, Phone, Download, ArrowUp, ArrowRight,
  Code2, Cpu, Database, Wrench, Users, GraduationCap, Award, Trophy,
  Briefcase, Send, MapPin, Sparkles, Moon, Sun, FileText, Rocket,
} from "lucide-react";


export const Route = createFileRoute("/")({ component: Index });

const NAV = [
  ["Home", "home"], ["About", "about"], ["Education", "education"],
  ["Skills", "skills"], ["Projects", "projects"], ["Certs", "certs"],
  ["Achievements", "achievements"], ["Experience", "experience"], ["Contact", "contact"],
] as const;

const ROLES = [
  "Computer Science Student",
  "AI Enthusiast",
  "Data Science Learner",
  "Web Developer",
  "Problem Solver",
];

function useTyping(words: string[], speed = 80, pause = 1400) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[idx % words.length];
    const t = setTimeout(() => {
      if (!del) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) setTimeout(() => setDel(true), pause);
      } else {
        const next = word.slice(0, text.length - 1);
        setText(next);
        if (next === "") { setDel(false); setIdx((i) => i + 1); }
      }
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [text, del, idx, words, speed, pause]);
  return text;
}

function useDark() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const root = document.documentElement;
    dark ? root.classList.add("dark") : root.classList.remove("dark");
  }, [dark]);
  return [dark, setDark] as const;
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setP(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return p;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("animate-fade-up"); io.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    els.forEach((el) => { el.style.opacity = "0"; io.observe(el); });
    return () => io.disconnect();
  }, []);
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const dur = 1400;
          const step = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            setV(Math.floor(p * to));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          io.disconnect();
        }
      });
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

function Particles() {
  const dots = Array.from({ length: 30 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => {
        const size = 2 + (i % 4);
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const dur = 6 + (i % 7);
        const delay = (i % 10) * 0.4;
        return (
          <span
            key={i}
            className="absolute rounded-full animate-float animate-pulse-glow"
            style={{
              width: size, height: size,
              left: `${left}%`, top: `${top}%`,
              background: "linear-gradient(120deg, var(--color-primary), var(--color-primary-glow))",
              boxShadow: "0 0 12px 2px color-mix(in oklab, var(--color-primary-glow) 60%, transparent)",
              animationDuration: `${dur}s`, animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-6xl px-6 py-24 sm:py-28">
      <div data-reveal className="mb-12 text-center">
        {eyebrow && (
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> {eyebrow}
          </div>
        )}
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
          <span className="text-gradient">{title}</span>
        </h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-primary-glow" />
      </div>
      {children}
    </section>
  );
}

function Navbar({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on(); window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "py-2" : "py-4"}`}>
      <div className={`mx-auto flex max-w-6xl items-center justify-between px-6 ${scrolled ? "glass rounded-2xl" : ""} transition-all`}>
        <a href="#home" className="flex items-center gap-2 py-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow font-bold text-primary-foreground shadow-lg">SL</div>
          <span className="font-display text-lg font-semibold">Sarmad<span className="text-primary">.</span></span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">{label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDark(!dark)}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card/50 text-foreground transition-colors hover:bg-secondary"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card/50 md:hidden"
          >
            <div className="space-y-1">
              <span className="block h-0.5 w-4 bg-foreground" />
              <span className="block h-0.5 w-4 bg-foreground" />
              <span className="block h-0.5 w-4 bg-foreground" />
            </div>
          </button>
        </div>
      </div>
      {open && (
        <div className="mx-6 mt-2 glass rounded-2xl p-2 md:hidden">
          {NAV.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="block rounded-lg px-4 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground">{label}</a>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero() {
  const typed = useTyping(ROLES);
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <Particles />
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 py-20 lg:grid-cols-2">
        <div className="animate-fade-up">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-medium">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Available for remote internships
          </div>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            Hi, I'm <span className="text-gradient">Sarmad Laghari</span>
          </h1>
          <div className="mt-4 flex items-baseline gap-2 font-mono text-lg text-muted-foreground sm:text-xl">
            <span className="text-primary">&gt;</span>
            <span className="text-foreground">{typed}</span>
            <span className="inline-block h-5 w-[2px] animate-blink bg-primary" />
          </div>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
            Computer Science student at Sukkur IBA University passionate about
            <span className="text-foreground"> AI</span>,
            <span className="text-foreground"> Data Science</span>, and
            <span className="text-foreground"> Web Development</span>. I build practical, real-world projects and earn industry certifications while looking for meaningful remote internship opportunities.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#resume" className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold">
              <Download className="h-4 w-4" /> Download Resume
            </a>
            <a href="#projects" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/50 px-5 py-3 text-sm font-semibold transition-all hover:bg-secondary">
              <Rocket className="h-4 w-4" /> View Projects
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/50 px-5 py-3 text-sm font-semibold transition-all hover:bg-secondary">
              <Mail className="h-4 w-4" /> Contact Me
            </a>
          </div>
          <div className="mt-8 flex items-center gap-3">
            {[
              { Icon: Github, href: "https://github.com/SARMADGitHub" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/sarmad-laghari-760049317" },
              { Icon: Mail, href: "mailto:sarmadlaghari05@gmail.com" },
            ].map(({ Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noreferrer" className="group grid h-10 w-10 place-items-center rounded-xl border border-border bg-card/60 transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div className="relative mx-auto animate-fade-up" style={{ animationDelay: ".2s" }}>
          <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary to-primary-glow opacity-30 blur-3xl animate-pulse-glow" />
          <div className="relative grid h-72 w-72 place-items-center rounded-full glow-ring sm:h-96 sm:w-96">
            <div className="absolute inset-0 rounded-full border border-border/60" />
            <div className="absolute inset-4 rounded-full border border-primary/30" style={{ animation: "spin 22s linear infinite" }} />
            <div className="absolute inset-10 rounded-full border border-accent/30" style={{ animation: "spin 32s linear infinite reverse" }} />
            <div className="relative grid h-52 w-52 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-primary via-primary-glow to-accent p-1 shadow-2xl sm:h-64 sm:w-64">
              <img
                src={profileAsset.url}
                alt="Sarmad Laghari"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            {[Code2, Cpu, Database, Wrench].map((Icon, i) => {
              const angle = (i / 4) * Math.PI * 2;
              const r = 160;
              return (
                <div
                  key={i}
                  className="absolute grid h-11 w-11 place-items-center rounded-xl border border-border bg-card/80 text-primary shadow-lg backdrop-blur animate-float"
                  style={{
                    left: `calc(50% + ${Math.cos(angle) * r}px - 22px)`,
                    top: `calc(50% + ${Math.sin(angle) * r}px - 22px)`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                >
                  <Icon className="h-5 w-5" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <a href="#about" className="absolute inset-x-0 bottom-6 mx-auto flex w-fit flex-col items-center gap-1 text-xs text-muted-foreground">
        <span>Scroll</span>
        <div className="h-8 w-5 rounded-full border border-border p-1">
          <div className="mx-auto h-1.5 w-1 animate-float rounded-full bg-primary" />
        </div>
      </a>
    </section>
  );
}

function About() {
  const stats = [
    { label: "Projects", value: 4, suffix: "+" },
    { label: "Certifications", value: 4, suffix: "" },
    { label: "Technologies", value: 15, suffix: "+" },
    { label: "Commitment", value: 100, suffix: "%" },
  ];
  return (
    <Section id="about" eyebrow="About" title="Who I Am">
      <div className="grid gap-8 md:grid-cols-5">
        <div data-reveal className="glass md:col-span-3 rounded-2xl p-8">
          <p className="text-base leading-relaxed text-muted-foreground">
            I'm a Computer Science student passionate about <span className="text-foreground font-medium">Artificial Intelligence</span>,
            <span className="text-foreground font-medium"> Data Science</span>,
            <span className="text-foreground font-medium"> Web Development</span>, and problem-solving.
            I enjoy learning new technologies and building real-world projects. I continuously
            improve my programming skills through practical development and professional
            certifications.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            My goal is to become a skilled software engineer and contribute to innovative
            technology solutions. I'm currently open to <span className="text-primary font-medium">remote internship opportunities</span>
            &nbsp;where I can apply my knowledge and grow.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs">
            {["AI", "Data Science", "Web Dev", "Problem Solving", "Java", "Python"].map((t) => (
              <span key={t} className="rounded-full border border-border bg-secondary px-3 py-1">{t}</span>
            ))}
          </div>
        </div>
        <div data-reveal className="grid md:col-span-2 grid-cols-2 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5 text-center">
              <div className="text-3xl font-bold text-gradient">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Academic Journey">
      <div className="relative mx-auto max-w-3xl">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary via-primary-glow to-transparent md:left-1/2" />
        <div data-reveal className="relative md:pl-0">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div className="glass rounded-2xl p-6 md:text-right">
              <div className="mb-1 text-xs font-mono text-primary">2023 — Present</div>
              <h3 className="text-xl font-semibold">Bachelor of Science in Computer Science</h3>
              <p className="mt-1 text-sm text-muted-foreground">Sukkur IBA University, Dadu Campus</p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary md:float-right">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> Currently Enrolled
              </div>
            </div>
            <div className="hidden md:block" />
          </div>
          <div className="absolute left-4 top-6 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-lg md:left-1/2">
            <GraduationCap className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Section>
  );
}

const SKILLS = {
  "Programming Languages": [
    { name: "Java", level: 85 },
    { name: "Python", level: 80 },
    { name: "C++", level: 75 },
    { name: "JavaScript", level: 78 },
    { name: "HTML", level: 92 },
    { name: "CSS", level: 88 },
  ],
  "Technologies": [
    { name: "Artificial Intelligence", level: 75 },
    { name: "Data Science", level: 72 },
    { name: "Web Development", level: 85 },
    { name: "Arduino", level: 70 },
    { name: "SQL", level: 80 },
  ],
  "Tools": [
    { name: "Git", level: 82 },
    { name: "GitHub", level: 85 },
    { name: "VS Code", level: 90 },
    { name: "MySQL", level: 78 },
  ],
  "Soft Skills": [
    { name: "Teamwork", level: 90 },
    { name: "Communication", level: 88 },
    { name: "Leadership", level: 82 },
    { name: "Problem Solving", level: 92 },
    { name: "Critical Thinking", level: 85 },
    { name: "Time Management", level: 84 },
  ],
};

function SkillBar({ name, level }: { name: string; level: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { setW(level); io.disconnect(); } });
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [level]);
  return (
    <div ref={ref}>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="font-mono text-xs text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-1000 ease-out"
          style={{ width: `${w}%`, boxShadow: "0 0 12px color-mix(in oklab, var(--color-primary-glow) 60%, transparent)" }}
        />
      </div>
    </div>
  );
}

function Skills() {
  const cats = [
    { title: "Programming Languages", Icon: Code2 },
    { title: "Technologies", Icon: Cpu },
    { title: "Tools", Icon: Wrench },
    { title: "Soft Skills", Icon: Users },
  ] as const;
  return (
    <Section id="skills" eyebrow="Skills" title="What I Work With">
      <div className="grid gap-6 md:grid-cols-2">
        {cats.map(({ title, Icon }) => (
          <div key={title} data-reveal className="glass rounded-2xl p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <div className="space-y-4">
              {SKILLS[title].map((s) => <SkillBar key={s.name} {...s} />)}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

const PROJECTS = [
  {
    title: "Student Management System",
    desc: "A complete management system for handling student information, records, attendance, and academic data.",
    tech: ["Java", "MySQL"],
    tag: "Desktop",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    title: "Campus Notice Board",
    desc: "Web application allowing administrators to publish notices while students access important campus announcements online.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    tag: "Web",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    title: "Pong Game",
    desc: "A classic Pong game developed to improve programming logic and game development skills.",
    tech: ["Java"],
    tag: "Game",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    title: "Weather Station",
    desc: "A mini weather monitoring system that measures environmental conditions using Arduino sensors.",
    tech: ["Arduino", "C++"],
    tag: "IoT",
    gradient: "from-sky-500 to-cyan-600",
  },
];

function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const tags = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.tag)))];
  const list = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tag === filter);
  return (
    <Section id="projects" eyebrow="Projects" title="Selected Work">
      <div data-reveal className="mb-8 flex flex-wrap justify-center gap-2">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`rounded-full px-4 py-1.5 text-sm transition-all ${filter === t ? "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-lg" : "border border-border bg-card/50 text-muted-foreground hover:text-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {list.map((p) => (
          <article key={p.title} data-reveal className="group glass overflow-hidden rounded-2xl transition-all hover:-translate-y-1 hover:glow-ring">
            <div className={`relative h-40 bg-gradient-to-br ${p.gradient} overflow-hidden`}>
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }} />
              <div className="absolute right-4 top-4 rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur">{p.tag}</div>
              <div className="absolute inset-0 grid place-items-center text-6xl font-bold text-white/20">{p.title.charAt(0)}</div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span key={t} className="rounded-md border border-border bg-secondary px-2 py-0.5 text-xs font-mono">{t}</span>
                ))}
              </div>
              <div className="mt-5 flex gap-2">
                <a href="https://github.com/SARMADGitHub" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card/50 px-3 py-2 text-xs font-medium transition-colors hover:bg-secondary">
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Certs() {
  const items = [
    "Data Science and Analytics",
    "Artificial Intelligence Beginner's Guide",
    "Innovating with Google Cloud AI",
    "Basics of Python Programming",
  ];
  return (
    <Section id="certs" eyebrow="Certifications" title="Credentials">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((c, i) => (
          <div key={c} data-reveal className="group glass relative overflow-hidden rounded-2xl p-6 transition-all hover:-translate-y-1 hover:glow-ring">
            <div className="absolute right-3 top-3 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">Completed</div>
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-lg">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-base font-semibold leading-snug">{c}</h3>
            <p className="mt-1 text-xs text-muted-foreground">Issued {2024 + (i % 2)}</p>
            <a href="#" className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              Verify <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Achievements() {
  const items = [
    { Icon: Trophy, title: "Sports Participation", desc: "Active member of university sports events, building teamwork and discipline." },
    { Icon: Award, title: "Awards", desc: "Recognized for academic performance and extracurricular contributions." },
    { Icon: GraduationCap, title: "Academic Activities", desc: "Consistent involvement in academic seminars, workshops, and study groups." },
    { Icon: Rocket, title: "University Competitions", desc: "Participated in multiple coding and problem-solving competitions." },
    { Icon: Sparkles, title: "Continuous Learning", desc: "Regularly earning certifications and exploring new tools & frameworks." },
  ];
  return (
    <Section id="achievements" eyebrow="Achievements" title="Milestones">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map(({ Icon, title, desc }) => (
          <div key={title} data-reveal className="glass rounded-2xl p-6 transition-all hover:-translate-y-1">
            <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I'm Headed">
      <div data-reveal className="mx-auto max-w-3xl">
        <div className="glass relative overflow-hidden rounded-2xl p-8">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-primary to-primary-glow opacity-20 blur-3xl" />
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-lg">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-primary">Currently Open</span>
              </div>
              <h3 className="mt-2 text-2xl font-semibold">Seeking Internship Opportunities</h3>
              <p className="mt-3 text-muted-foreground">
                Motivated Computer Science student seeking internship opportunities to apply
                technical skills, gain industry experience, and contribute to innovative
                software development projects. Especially interested in roles involving
                AI, data science, or full-stack web development.
              </p>
              <a href="#contact" className="btn-primary mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold">
                Get in touch <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Resume() {
  return (
    <Section id="resume" eyebrow="Resume" title="Full CV">
      <div data-reveal className="glass mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-2xl p-10 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-xl">
          <FileText className="h-8 w-8" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold">Download my resume</h3>
          <p className="mt-2 text-sm text-muted-foreground">Get the complete overview of my education, skills, projects, and certifications.</p>
        </div>
        <a href="#" className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold">
          <Download className="h-4 w-4" /> Download Resume (PDF)
        </a>
      </div>
    </Section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000); };
  const items = [
    { Icon: Mail, label: "Email", value: "sarmadlaghari05@gmail.com", href: "mailto:sarmadlaghari05@gmail.com" },
    { Icon: Phone, label: "Phone", value: "+92 3092585018", href: "tel:+923092585018" },
    { Icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/sarmad-laghari-760049317", href: "https://www.linkedin.com/in/sarmad-laghari-760049317" },
    { Icon: Github, label: "GitHub", value: "github.com/SARMADGitHub", href: "https://github.com/SARMADGitHub" },
  ];
  return (
    <Section id="contact" eyebrow="Contact" title="Let's Connect">
      <div className="grid gap-8 md:grid-cols-5">
        <div data-reveal className="md:col-span-2 space-y-3">
          {items.map(({ Icon, label, value, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" className="glass group flex items-center gap-4 rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:glow-ring">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
                <div className="truncate text-sm font-medium">{value}</div>
              </div>
            </a>
          ))}
          <div className="glass flex items-center gap-4 rounded-2xl p-4">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Based in</div>
              <div className="text-sm font-medium">Dadu, Sindh, Pakistan</div>
            </div>
          </div>
        </div>
        <form data-reveal onSubmit={onSubmit} className="glass md:col-span-3 space-y-4 rounded-2xl p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">Name</span>
              <input required className="w-full rounded-xl border border-border bg-background/50 px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary" placeholder="Your name" />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">Email</span>
              <input required type="email" className="w-full rounded-xl border border-border bg-background/50 px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary" placeholder="you@email.com" />
            </label>
          </div>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">Subject</span>
            <input required className="w-full rounded-xl border border-border bg-background/50 px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary" placeholder="What's this about?" />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">Message</span>
            <textarea required rows={5} className="w-full resize-none rounded-xl border border-border bg-background/50 px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary" placeholder="Write something..." />
          </label>
          <button type="submit" className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold">
            {sent ? "Message sent! ✓" : (<><Send className="h-4 w-4" /> Send Message</>)}
          </button>
        </form>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-card/30 backdrop-blur">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow font-bold text-primary-foreground">SL</div>
            <span className="font-display text-lg font-semibold">Sarmad Laghari</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">Computer Science student building real-world projects in AI, Data Science, and Web Development.</p>
        </div>
        <div>
          <div className="text-sm font-semibold">Quick Links</div>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {NAV.map(([label, id]) => (
              <li key={id}><a href={`#${id}`} className="hover:text-foreground">{label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold">Connect</div>
          <div className="mt-3 flex gap-2">
            {[
              { Icon: Github, href: "https://github.com/SARMADGitHub" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/sarmad-laghari-760049317" },
              { Icon: Mail, href: "mailto:sarmadlaghari05@gmail.com" },
            ].map(({ Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card/60 transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">Visitors: <Counter to={1247} />+</p>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Sarmad Laghari. Designed with <span className="text-red-500">❤</span> by Sarmad Laghari.
      </div>
    </footer>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 500);
    on(); window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="btn-primary fixed bottom-6 right-6 z-50 grid h-11 w-11 place-items-center rounded-full shadow-2xl"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}

function Loader({ done }: { done: boolean }) {
  return (
    <div className={`fixed inset-0 z-[100] grid place-items-center bg-background transition-opacity duration-700 ${done ? "pointer-events-none opacity-0" : "opacity-100"}`}>
      <div className="text-center">
        <div className="relative mx-auto grid h-20 w-20 place-items-center">
          <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary" style={{ animation: "spin 1s linear infinite" }} />
          <div className="font-display text-2xl font-bold text-gradient">SL</div>
        </div>
        <div className="mt-4 font-mono text-xs text-muted-foreground">Loading portfolio...</div>
      </div>
    </div>
  );
}

function Index() {
  const [dark, setDark] = useDark();
  const progress = useScrollProgress();
  const [loaded, setLoaded] = useState(false);
  useReveal();
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 800); return () => clearTimeout(t); }, []);

  return (
    <>
      <Loader done={loaded} />
      <div
        className="fixed left-0 top-0 z-[60] h-0.5 bg-gradient-to-r from-primary to-primary-glow transition-all"
        style={{ width: `${progress}%` }}
      />
      <Navbar dark={dark} setDark={setDark} />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Certs />
        <Achievements />
        <Experience />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
