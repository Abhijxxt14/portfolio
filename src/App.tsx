import { useRef, useEffect, useState } from 'react';
import createGlobe from 'cobe';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import type { IconType } from 'react-icons';
import { SiReact, SiTypescript, SiNodedotjs } from 'react-icons/si';
import { SiPython, SiPytorch, SiTensorflow } from 'react-icons/si';
import { SiArduino, SiRaspberrypi, SiInfluxdb } from 'react-icons/si';
import { SiFastapi, SiPostgresql, SiRedis } from 'react-icons/si';
import { SiDocker, SiGit, SiVite } from 'react-icons/si';
import { SiThreedotjs, SiJavascript, SiCss } from 'react-icons/si';
import { SiNumpy, SiPandas, SiJupyter } from 'react-icons/si';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AuroraBackground } from './AuroraBackground';

gsap.registerPlugin(ScrollTrigger);

// Canvas Logo Component with Mouse Parallax
const LogoCanvas = () => {
  const [shadow, setShadow] = useState('0 0 0 rgba(0,0,128,0)');

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setShadow(`${-nx * 4}px ${ny * 4}px 8px rgba(0,0,128,0.45)`);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <span
      style={{
        fontFamily: '"Archivo Black", sans-serif',
        fontSize: '14px',
        fontWeight: 900,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#111',
        textShadow: shadow,
        transition: 'text-shadow 0.1s linear',
        userSelect: 'none',
      }}
    >
      ABHIJEET
    </span>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const menuVariants = {
    closed: { opacity: 0, y: "-100%" },
    open: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255,255,255,0.55)',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.12)' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" aria-label="Back to home" style={{ display: 'flex', alignItems: 'center' }}>
            <LogoCanvas />
          </a>
          <div className="hidden md:flex gap-8 items-center text-sm font-semibold tracking-wide uppercase">
            <a href="#about" className="text-black hover:text-[var(--color-accent-hero)] transition-colors relative group">
              About
              <span className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-[var(--color-accent-hero)] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </a>
            <a href="#projects" className="text-black hover:text-[var(--color-accent-hero)] transition-colors relative group">
              Projects
              <span className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-[var(--color-accent-hero)] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </a>
            <a href="#skills" className="text-black hover:text-[var(--color-accent-hero)] transition-colors relative group">
              Skills
              <span className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-[var(--color-accent-hero)] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </a>
            <a href="#experience" className="text-black hover:text-[var(--color-accent-hero)] transition-colors relative group">
              Timeline
              <span className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-[var(--color-accent-hero)] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </a>
            <a href="#contact" className="bg-black text-white px-6 py-2 rounded-[12px] hover:scale-105 transition-transform" style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
              Contact
            </a>
          </div>
          <button className="md:hidden text-black z-[60]" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-[40] bg-white flex flex-col items-center justify-center gap-8 md:hidden text-2xl font-bold uppercase tracking-widest"
          >
            <a href="#about" onClick={() => setIsOpen(false)} className="hover:text-[var(--color-accent-hero)] transition-colors">About</a>
            <a href="#projects" onClick={() => setIsOpen(false)} className="hover:text-[var(--color-accent-hero)] transition-colors">Projects</a>
            <a href="#skills" onClick={() => setIsOpen(false)} className="hover:text-[var(--color-accent-hero)] transition-colors">Skills</a>
            <a href="#experience" onClick={() => setIsOpen(false)} className="hover:text-[var(--color-accent-hero)] transition-colors">Timeline</a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="text-[var(--color-accent-hero)]">Contact</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const MarqueeTicker = ({ text, rotation, direction }: { text: string, rotation: number, direction: 1 | -1 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="absolute w-[120vw] -left-[10vw] h-[80px] bg-white text-black flex items-center border-y-4 border-black z-10 origin-center"
      style={{
        transform: `rotate(${rotation}deg) scale(1.1)`,
        backgroundColor: rotation > 0 ? 'var(--color-surface)' : 'white',
        color: rotation > 0 ? 'white' : 'black',
        borderColor: rotation > 0 ? 'white' : 'black'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="font-heading text-2xl md:text-4xl uppercase whitespace-nowrap flex"
        animate={{ x: direction === 1 ? [0, -1000] : [-1000, 0] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: isHovered ? 40 : 20
        }}
      >
        <span>{text}</span>
        <span>{text}</span>
      </motion.div>
    </div>
  );
};

// ─── WORK EXPERIENCE ────────────────────────────────────────────────────────

const WorkExperienceSection = () => {
  return (
    <section id="work-experience" className="w-full bg-[#f4f4f5] text-black pt-16 pb-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div style={{ fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#888', fontWeight: 700, marginBottom: 20 }}>
          ○ CURRENT ROLE
        </div>
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          <div className="w-full lg:w-1/3">
            <h2 className="font-heading text-5xl md:text-7xl uppercase text-black leading-[0.9] tracking-tight m-0 sticky top-32">
              EXPERIENCE
            </h2>
          </div>
          
          <div className="w-full lg:w-2/3">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative border-2 border-black rounded-3xl p-8 md:p-12 overflow-hidden bg-white hover:-translate-y-2 transition-transform duration-500 will-change-transform shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#000080]" />
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative z-10">
                <div>
                  <h3 className="font-heading text-4xl md:text-5xl uppercase tracking-tighter text-black m-0 mb-2">
                    Uxoria
                  </h3>
                  <div className="font-body text-xl md:text-2xl font-bold text-gray-800">
                    Full Stack Developer
                  </div>
                </div>
                
                <div className="flex flex-col items-start md:items-end gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 border border-black/10 rounded-full text-[10px] font-bold tracking-widest uppercase bg-gray-50">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.6)]" style={{ animation: 'pulse-dot 2s ease-in-out infinite' }}></div>
                    Present
                  </div>
                  <a 
                    href="mailto:abhijeetsoren@uxoria.work" 
                    className="flex items-center gap-2 text-sm font-bold text-[#000080] hover:text-black transition-colors group/link"
                  >
                    <Mail size={14} className="group-hover/link:scale-110 transition-transform" /> abhijeetsoren@uxoria.work
                  </a>
                </div>
              </div>
              
              <div className="border-t border-black/10 pt-8 relative z-10">
                <p className="font-body text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mb-8">
                  Engineering scalable web applications and intuitive user interfaces. Leading full-stack development initiatives with a focus on performance, robust architecture, and premium user experiences tailored for modern digital studios.
                </p>
                
                <div className="flex flex-wrap gap-3">
                  {['React', 'TypeScript', 'Node.js', 'System Architecture', 'UI/UX'].map(tag => (
                    <span key={tag} className="px-4 py-2 border-[1.5px] border-black/20 text-[10px] font-bold uppercase tracking-widest text-black rounded-md bg-white hover:bg-black hover:text-white transition-colors duration-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Background watermark */}
              <div className="absolute -bottom-10 -right-10 text-[12rem] md:text-[16rem] font-heading text-black opacity-[0.02] pointer-events-none select-none leading-none tracking-tighter">
                UX
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Marquees = () => {
  const text = Array(15).fill("ABHIJEET SOREN ● SOFTWARE ENGINEER ● AI SYSTEMS ●").join(" ");
  return (
    <div className="relative h-[250px] bg-[#f4f4f5] overflow-hidden flex items-center justify-center isolate py-8">
      <MarqueeTicker text={text} rotation={-5} direction={1} />
      <MarqueeTicker text={text} rotation={5} direction={-1} />
    </div>
  );
};

// ─── PROJECTS — THE VAULT SLIDING DECK ───────────────────────────────────────

const projects = [
  {
    id: '01',
    title: 'MEDISYNC',
    category: 'HEALTHCARE',
    description:
      'Healthcare management platform for seamless patient-doctor coordination. Features appointment scheduling, medical records management, and real-time notifications.',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    status: 'LIVE',
    accentColor: '#3b82f6',
    github: 'https://github.com/abhijeet-soren',
    live: 'https://med-sync-delta.vercel.app/',
    image: '/assets/medisync.png',
  },
  {
    id: '02',
    title: 'HIREBYTE',
    category: 'AI TOOLS',
    description:
      'AI-powered resume creation platform with intelligent formatting. Built with Next.js 16, leveraging Groq SDK (Llama 3.3 70B) for smart content generation.',
    tech: ['Next.js 16', 'TypeScript', 'Tailwind', 'Radix UI', 'Groq SDK'],
    status: 'LIVE',
    accentColor: '#8b5cf6',
    github: 'https://github.com/abhijeet-soren',
    live: 'https://hirebyte.vercel.app/',
    image: '/assets/hirebyte.png',
  },
  {
    id: '03',
    title: 'VOLETAGIS',
    category: 'IOT',
    description:
      'IoT-based fire detection and alert system. Real-time monitoring with automated alerts and emergency response integration.',
    tech: ['React', 'Arduino', 'MQTT', 'Firebase'],
    status: 'LIVE',
    accentColor: '#ef4444',
    github: 'https://github.com/abhijeet-soren',
    live: 'https://voletagis.netlify.app/',
    image: '/assets/voletagis.png',
  },
  {
    id: '04',
    title: 'LITERAG',
    category: 'AI SYSTEMS',
    description:
      'Privacy-first lightweight RAG agent for edge deployment. Deployable knowledge assistant with context-aware retrieval and semantic understanding on ordinary hardware without heavy LLM dependency.',
    tech: ['Python', 'Vector DB', 'Transformers', 'Search', 'LLMs'],
    status: 'LIVE',
    accentColor: '#22c55e',
    github: 'https://github.com/abhijeet-soren',
    live: 'https://literag-bay.vercel.app/',
    image: '/assets/literag.png',
  },
];

type PillCursor = { x: number; y: number; visible: boolean; label: string; href: string };

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bgNumRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pill, setPill] = useState<PillCursor>({ x: 0, y: 0, visible: false, label: '', href: '' });

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const bgNum = bgNumRef.current;
    if (!section || !track) return;

    const getX = () => -(track.scrollWidth - window.innerWidth);

    const ctx = gsap.context(() => {
      // ── Main horizontal slide ──────────────────────────────────────────────
      gsap.to(track, {
        x: getX,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (projects.length - 1));
            setActiveIndex(prev => {
              if (prev === idx) return prev;
              return idx;
            });
          },
        },
      });

      // ── Counter-parallax bg number: moves at 0.5× speed ───────────────────
      if (bgNum) {
        gsap.to(bgNum, {
          x: () => getX() * 0.42,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.4,
            invalidateOnRefresh: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setPill(p => ({ ...p, x: e.clientX, y: e.clientY }));
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{
        height: `${(projects.length + 1) * 100}vh`,
        position: 'relative',
        background: '#000000',
      }}
    >
      {/* ── Mouse-following pill cursor ──────────────────────────────────── */}
      <div
        style={{
          position: 'fixed',
          left: pill.x + 14,
          top: pill.y + 14,
          zIndex: 9999,
          pointerEvents: 'none',
          background: '#000',
          color: '#fff',
          padding: '7px 16px',
          borderRadius: 999,
          fontFamily: '"Inter", sans-serif',
          fontSize: '10px',
          fontWeight: 800,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          opacity: pill.visible ? 1 : 0,
          transform: pill.visible ? 'scale(1)' : 'scale(0.7)',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
        }}
      >
        {pill.label}
      </div>

      {/* ── Sticky 100 vh viewport ───────────────────────────────────────── */}
      <div
        style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}
        onMouseMove={handleMouseMove}
      >
        {/* Corner meta labels */}
        <div style={{ position: 'absolute', top: 30, left: 40, zIndex: 30, fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#888', pointerEvents: 'none' }}>
          ○ 04 — SELECTED PROJECTS
        </div>

        {/* Progress pips — top right */}
        <div style={{ position: 'absolute', top: 34, right: 40, zIndex: 30, display: 'flex', alignItems: 'center', gap: 7 }}>
          {projects.map((_, i) => (
            <div
              key={i}
              style={{ height: 6, width: i === activeIndex ? 22 : 6, borderRadius: 3, background: i === activeIndex ? projects[activeIndex].accentColor : '#ddd', transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)' }}
            />
          ))}
        </div>

        {/* ── Counter-parallax background number ───────────────────────── */}
        <div
          ref={bgNumRef}
          style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', paddingLeft: '8vw', zIndex: 0, pointerEvents: 'none', userSelect: 'none', overflow: 'hidden' }}
        >
          <motion.span
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            style={{
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: '48vw',
              fontWeight: 900,
              lineHeight: 1,
              WebkitTextStroke: '1.5px #d0d0d0',
              color: 'transparent',
              letterSpacing: '-0.06em',
              whiteSpace: 'nowrap',
            }}
          >
            {projects[activeIndex].id}
          </motion.span>
        </div>

        {/* ── Horizontal slide track ───────────────────────────────────── */}
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            gap: '5vw',
            paddingLeft: 'var(--project-track-padding)',
            paddingRight: 'var(--project-track-padding)',
            willChange: 'transform',
          }}
        >
          {projects.map((project, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={project.id}
                style={{
                  flexShrink: 0,
                  width: 'var(--project-card-width)',
                  height: 'var(--project-card-height)',
                  background: '#ffffff',
                  border: isActive ? `2px solid ${project.accentColor}` : '1.5px solid #333',
                  borderRadius: 24,
                  transform: isActive ? 'scale(1.07)' : 'scale(0.86)',
                  opacity: isActive ? 1 : 0.42,
                  filter: isActive ? 'none' : 'blur(3.5px) saturate(0.5)',
                  transition: 'transform 0.65s cubic-bezier(0.16,1,0.3,1), opacity 0.55s ease, filter 0.55s ease, border 0.3s ease',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                {/* Accent top bar */}
                <div style={{ height: 4, background: project.accentColor, flexShrink: 0, zIndex: 10 }} />

                {/* Project Image */}
                <div style={{ flex: '0 0 40%', width: '100%', overflow: 'hidden', position: 'relative', backgroundColor: '#f4f4f5' }}>
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    initial={false}
                    animate={{
                      filter: isActive ? 'grayscale(0%)' : 'grayscale(100%)',
                      scale: isActive ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  {/* Subtle gradient overlay to blend with the card background */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(255,255,255,1) 100%)', pointerEvents: 'none' }} />
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 32px 24px', gap: 16, overflow: 'hidden', position: 'relative', zIndex: 1 }}>

                  {/* Header row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.2em', color: '#aaa', textTransform: 'uppercase', marginBottom: 6 }}>{project.category}</div>
                      <h3 style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: 900, color: '#000', textTransform: 'uppercase', lineHeight: 0.95, letterSpacing: '-0.03em', margin: 0 }}>
                        {project.title}
                      </h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, marginLeft: 8 }}>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: project.accentColor }} />
                      <span style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '8px', letterSpacing: '0.16em', textTransform: 'uppercase', color: project.accentColor }}>{project.status}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '13px', color: '#555', lineHeight: 1.7, margin: 0, flex: 1, overflow: 'hidden' }}>{project.description}</p>

                  {/* Tech tags — stagger pop when card becomes active */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {project.tech.map((t, ti) => (
                      <motion.span
                        key={`${t}-${isActive ? 'on' : 'off'}`}
                        initial={isActive ? { scale: 0, opacity: 0, y: 6 } : false}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 20, delay: ti * 0.055 }}
                        style={{
                          padding: '4px 11px',
                          border: `1.5px solid ${isActive ? '#000' : '#e5e7eb'}`,
                          fontFamily: '"Inter", sans-serif',
                          fontSize: '9.5px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.09em',
                          color: isActive ? '#000' : '#bbb',
                          background: '#fff',
                          borderRadius: 4,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>

                  {/* Links — only shown on active; trigger pill cursor on hover */}
                  <div style={{ display: 'flex', gap: 14, paddingTop: 10, borderTop: '1px solid #f0f0f0', opacity: isActive ? 1 : 0, transition: 'opacity 0.4s ease' }}>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={(e) => setPill({ x: e.clientX, y: e.clientY, visible: true, label: '↗ VIEW CODE', href: project.github })}
                      onMouseLeave={() => setPill(p => ({ ...p, visible: false }))}
                      style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: '"Inter", sans-serif', fontSize: '11px', fontWeight: 700, color: '#000', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase' }}
                    >
                      <Github size={12} /> Code
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={(e) => setPill({ x: e.clientX, y: e.clientY, visible: true, label: '↗ LIVE DEMO', href: project.live })}
                      onMouseLeave={() => setPill(p => ({ ...p, visible: false }))}
                      style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: '"Inter", sans-serif', fontSize: '11px', fontWeight: 700, color: '#000', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase' }}
                    >
                      <ExternalLink size={12} /> Live Demo
                    </a>
                  </div>
                </div>

                {/* Big ghost ID in card background */}
                <div style={{ position: 'absolute', bottom: -12, right: 16, fontFamily: '"Archivo Black", sans-serif', fontSize: '9rem', fontWeight: 900, color: '#000', opacity: 0.04, lineHeight: 1, letterSpacing: '-0.06em', pointerEvents: 'none', userSelect: 'none' }}>
                  {project.id}
                </div>
              </div>
            );
          })}
        </div>

        {/* Active project title + counter — bottom left */}
        <div style={{ position: 'absolute', bottom: 32, left: 40, zIndex: 30, pointerEvents: 'none' }}>
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: 'clamp(1rem,1.8vw,1.5rem)', textTransform: 'uppercase', letterSpacing: '-0.02em', color: '#000', fontWeight: 900 }}>
              {projects[activeIndex].title}
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.18em', color: '#888', marginTop: 4, textTransform: 'uppercase' }}>
              SCROLL TO BROWSE &nbsp;—&nbsp; {projects[activeIndex].id} / {String(projects.length).padStart(2, '0')}
            </div>
          </motion.div>
        </div>

        {/* Active accent line — bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, height: 3, background: projects[activeIndex].accentColor, transition: 'background 0.6s ease, width 0.6s cubic-bezier(0.16,1,0.3,1)', width: `${((activeIndex + 1) / projects.length) * 100}%`, zIndex: 30 }} />
      </div>
    </section>
  );
};

// ─── SKILLS — KINETIC TYPOGRAPHY PARALLAX ────────────────────────────────────

type TechCard = {
  id: number; label: string; stack: string; icons: IconType[];
  bg: string; accent: string;
  top: string; left: string; rotation: number;
  speed: number; // absolute vw translation over the full 300vh scroll
  width: number;
};

const techCards: TechCard[] = [
  { id: 1, label: 'FULL STACK', stack: 'React · TypeScript · Node.js', icons: [SiReact, SiTypescript, SiNodedotjs], bg: '#0f1b2d', accent: '#3b82f6', top: '12%', left: '4%', rotation: -2, speed: 44, width: 220 },
  { id: 2, label: 'AI SYSTEMS', stack: 'LangChain · Pinecone · PyTorch', icons: [SiPython, SiPytorch, SiTensorflow], bg: '#1a0533', accent: '#a855f7', top: '54%', left: '9%', rotation: 1.5, speed: 52, width: 200 },
  { id: 3, label: 'IOT', stack: 'ESP32 · MQTT · InfluxDB', icons: [SiArduino, SiRaspberrypi, SiInfluxdb], bg: '#1c1000', accent: '#f59e0b', top: '20%', left: '36%', rotation: -1.2, speed: 36, width: 190 },
  { id: 4, label: 'BACKEND', stack: 'FastAPI · PostgreSQL · Redis', icons: [SiFastapi, SiPostgresql, SiRedis], bg: '#021207', accent: '#22c55e', top: '61%', left: '43%', rotation: 2, speed: 54, width: 210 },
  { id: 5, label: 'DEVOPS', stack: 'Docker · Git · CI/CD · Vite', icons: [SiDocker, SiGit, SiVite], bg: '#200a0a', accent: '#ef4444', top: '7%', left: '60%', rotation: -1.5, speed: 46, width: 185 },
  { id: 6, label: 'CREATIVE DEV', stack: 'Three.js · GSAP · WebGL · CSS', icons: [SiThreedotjs, SiJavascript, SiCss], bg: '#00001a', accent: '#000080', top: '43%', left: '71%', rotation: 1, speed: 38, width: 200 },
  { id: 7, label: 'PYTHON', stack: 'PyTorch · Pandas · NumPy · Jupyter', icons: [SiPython, SiNumpy, SiPandas, SiJupyter], bg: '#0d1117', accent: '#60a5fa', top: '27%', left: '81%', rotation: -0.8, speed: 56, width: 195 },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    if (!section || !headline) return;

    const ctx = gsap.context(() => {
      // Headline sweeps left at 1× speed — scrub:1 gives the smooth high-inertia feel
      gsap.to(headline, {
        xPercent: -55,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      // Each card moves at a slightly different vw amount, creating layered depth.
      // Cards use scrub:1.5 for slightly heavier inertia than the text.
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const { speed, rotation } = techCards[i];
        // Let GSAP own the full transform so rotation + x don't conflict
        gsap.set(card, { rotation });
        gsap.to(card, {
          x: `-${speed}vw`,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      style={{ height: '300vh', position: 'relative', backgroundColor: '#ffffff' }}
    >
      {/* ── Sticky viewport ─────────────────────────────────────────────── */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* Corner labels */}
        <div style={{ position: 'absolute', top: 36, left: 40, zIndex: 30, fontFamily: 'var(--font-heading)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#bbb', fontWeight: 700, pointerEvents: 'none' }}>
          §05 — CORE CAPABILITIES
        </div>
        <div style={{ position: 'absolute', top: 36, right: 40, zIndex: 30, fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#ccc', pointerEvents: 'none' }}>
          7 PRACTICE AREAS
        </div>

        {/* ── Massive kinetic headline ─────────────────────────────────── */}
        {/* Flex-center wrapper keeps the text vertically centred; GSAP only touches the inner div */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', pointerEvents: 'none', userSelect: 'none' }}>
          <div ref={headlineRef} style={{ willChange: 'transform', whiteSpace: 'nowrap' }}>
            <span style={{
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: '30vw',
              fontWeight: 900,
              color: '#000',
              textTransform: 'uppercase',
              lineHeight: 1,
              letterSpacing: '-0.05em',
              display: 'block',
            }}>
              ENGINEERING&nbsp;STACK
            </span>
          </div>
        </div>

        {/* ── Floating scattered tech cards ────────────────────────────── */}
        {techCards.map((card, i) => (
          <div
            key={card.id}
            ref={el => { cardsRef.current[i] = el; }}
            style={{
              position: 'absolute',
              top: card.top,
              left: card.left,
              width: `${card.width}px`,
              zIndex: 20,
              willChange: 'transform',
            }}
          >
            {/* 4:3 image-like preview block */}
            <div style={{ width: '100%', aspectRatio: '4/3', background: card.bg, position: 'relative', overflow: 'hidden' }}>
              {/* Dot-grid accent */}
              <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, ${card.accent}55 1.5px, transparent 1.5px)`, backgroundSize: '14px 14px' }} />
              {/* Subtle scanlines */}
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 4px)' }} />
              {/* Central glowing tech logos */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '0 14px', maxWidth: '100%' }}>
                  {card.icons.map((Icon, idx) => (
                    <Icon
                      key={idx}
                      size={card.icons.length > 3 ? 30 : 36}
                      color={card.accent}
                      style={{ filter: `drop-shadow(0 0 10px ${card.accent}) drop-shadow(0 0 24px ${card.accent}88)`, flexShrink: 0 }}
                    />
                  ))}
                </div>
              </div>
              {/* Bottom accent bar */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, backgroundColor: card.accent }} />
              {/* Label chip */}
              <div style={{ position: 'absolute', top: 8, left: 8, backgroundColor: card.accent, color: '#fff', fontFamily: '"Inter", sans-serif', fontSize: '8px', padding: '3px 7px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                {card.label}
              </div>
            </div>
            {/* Stack caption — small, monospaced, lowercase */}
            <div style={{ marginTop: 7, fontFamily: '"Inter", monospace, sans-serif', fontSize: '10.5px', color: '#888', letterSpacing: '0.03em', textTransform: 'lowercase', fontWeight: 500, lineHeight: 1.4, textAlign: 'left' }}>
              {card.stack}
            </div>
          </div>
        ))}

        {/* ── Scroll indicator ─────────────────────────────────────────── */}
        <div style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', zIndex: 30, display: 'flex', alignItems: 'center', gap: 12, pointerEvents: 'none' }}>
          <div style={{ width: 28, height: 1, backgroundColor: '#ddd' }} />
          <span style={{ fontFamily: 'monospace', fontSize: '9px', color: '#ccc', letterSpacing: '0.16em', textTransform: 'uppercase' }}>SCROLL TO EXPLORE</span>
          <div style={{ width: 28, height: 1, backgroundColor: '#ddd' }} />
        </div>
      </div>
    </section>
  );
};

// ─── EXPERIENCE — STICKY CARD STACK ──────────────────────────────────────────

const experienceData = [
  {
    year: '2023',
    period: '2023',
    type: 'FOUNDATIONS',
    title: 'Java & Computer\nScience Foundations',
    org: 'Problem Solving & Logic',
    description:
      'Gained a solid understanding of object-oriented programming with Java. Covered core Data Structures & Algorithms, including arrays, linked lists, stacks, queues, and recursion, honing initial problem-solving skills.',
    tags: ['Java', 'Algorithms', 'Data Structures', 'Problem Solving'],
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800',
  },
  {
    year: '2024',
    period: '2024',
    type: 'WEB DEV',
    title: 'Full-Stack\nWeb Development',
    org: 'MERN Stack Applications',
    description:
      'Mastered modern web development. Transitioned from the basics of HTML, CSS, and JavaScript, into building complete, functional web applications leveraging React.js, Node.js, Express, and MongoDB.',
    tags: ['React.js', 'Node.js', 'Express', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800',
  },
  {
    year: '2025',
    period: '2025',
    type: 'AI SYSTEMS',
    title: 'Python &\nAI Systems',
    org: 'LLM Applications',
    description:
      'Pivoted focus toward backend systems and artificial intelligence. Built applications based on Retrieval-Augmented Generation (RAG) using Python, vector databases, embeddings, and semantic search systems.',
    tags: ['Python', 'RAG', 'Vector DB', 'Semantic Search'],
    image: 'https://images.unsplash.com/photo-1620712948343-0056911f12ba?auto=format&fit=crop&q=80&w=800',
  },
  {
    year: '2026',
    period: '2026',
    type: 'ENGINEERING',
    title: 'LLM Systems\nEngineering',
    org: 'Agentic Workflows',
    description:
      'Focusing exclusively on productionizing AI pipelines. Architecting sophisticated LLM applications and constructing robust autonomous agentic workflows designed for scale and complexity.',
    tags: ['LLMs', 'Agentic Workflows', 'Architecture', 'AI Engineering'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
  },
];

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card || i >= experienceData.length - 1) return;
        const nextScene = sceneRefs.current[i + 1];
        if (!nextScene) return;

        // As the next card slides in, push this one back in scale+brightness
        gsap.fromTo(
          card,
          { scale: 1, filter: 'brightness(1)' },
          {
            scale: 0.9,
            filter: 'brightness(0.55)',
            transformOrigin: 'top center',
            ease: 'none',
            scrollTrigger: {
              trigger: nextScene,
              start: 'top bottom',   // next scene enters viewport bottom
              end: 'top top',      // next scene reaches top of viewport
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      style={{ background: '#000', position: 'relative' }}
    >
      {/* ── Static section header ─────────────────────────────────────────── */}
      <div style={{ padding: '100px 40px 72px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#555', fontWeight: 700, marginBottom: 20 }}>
          ○ 06 — EXPERIENCE
        </div>
        <h2 style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.04em', lineHeight: 0.9, margin: 0, marginBottom: 20 }}>
          EDUCATION & EXPERIENCE
        </h2>
        <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '1.1rem', color: '#666', maxWidth: 560, lineHeight: 1.6, margin: 0 }}>
          A concise view of my academic background, technical work, and key milestones.
        </p>
        {/* Divider marquee strip */}
        <div style={{ marginTop: 48, overflow: 'hidden', height: 36, position: 'relative', borderTop: '1px solid #222', borderBottom: '1px solid #222' }}>
          <motion.div
            animate={{ x: [0, -600] }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 12 }}
            style={{ display: 'flex', whiteSpace: 'nowrap', height: '100%', alignItems: 'center', gap: 0 }}
          >
            {Array(20).fill('EDUCATION ● RESEARCH ● ENGINEERING ● PROJECTS ●').map((t, i) => (
              <span key={i} style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '11px', color: '#000080', textTransform: 'uppercase', letterSpacing: '0.18em', marginRight: 32 }}>{t}</span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Sticky card stack ─────────────────────────────────────────────── */}
      {experienceData.map((exp, i) => (
        <div
          key={i}
          ref={el => { sceneRefs.current[i] = el; }}
          style={{ height: '100vh', position: 'relative' }}
        >
          <div
            ref={el => { cardRefs.current[i] = el; }}
            style={{
              position: 'sticky',
              top: '5vh',
              height: '88vh',
              margin: '0 24px',
              background: '#ffffff',
              borderRadius: 24,
              border: '2px solid #000',
              overflow: 'hidden',
              willChange: 'transform, filter',
            }}
          >
            {/* Orange top accent bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: '#000080', zIndex: 2 }} />

            {/* Background year watermark */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', userSelect: 'none', overflow: 'hidden', zIndex: 0 }}>
              <span style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '38vw', fontWeight: 900, color: '#000', opacity: 0.04, lineHeight: 1, letterSpacing: '-0.06em' }}>
                {exp.year}
              </span>
            </div>

            {/* Card index pip — top right */}
            <div style={{ position: 'absolute', top: 22, right: 28, zIndex: 2, fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.18em', color: '#bbb', textTransform: 'uppercase' }}>
              {String(i + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(experienceData.length).padStart(2, '0')}
            </div>

            {/* ── Split-screen layout ── */}
            <div className="flex flex-col md:flex-row h-full pt-1 relative z-10">

              {/* Left panel — Year + type */}
              <div className="w-full md:w-1/3 border-b-2 md:border-b-0 md:border-r-2 border-black flex flex-col justify-between p-6 md:p-9 lg:p-11 flex-shrink-0">
                <div className="flex justify-between md:flex-col md:justify-start items-center md:items-start h-full">
                  <div>
                    <div style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.22em', color: '#aaa', textTransform: 'uppercase', marginBottom: 8 }}>
                      PERIOD
                    </div>
                    <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: 'clamp(2.5rem, 6vw, 6.5rem)', fontWeight: 900, color: '#000', lineHeight: 0.85, letterSpacing: '-0.04em' }}>
                      {exp.year}
                    </div>
                  </div>

                  <div className="text-right md:text-left md:mt-auto">
                    {/* Type badge */}
                    <div style={{ display: 'inline-block', backgroundColor: '#000080', color: '#fff', fontFamily: '"Archivo Black", sans-serif', fontSize: '10px', letterSpacing: '0.16em', padding: '6px 12px', textTransform: 'uppercase', marginBottom: 6 }}>
                      {exp.type}
                    </div>
                    <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '10px', color: '#999', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700 }}>
                      {exp.period}
                    </div>
                    {/* Orange ornament */}
                    <div className="hidden md:flex items-center gap-2 mt-6">
                      <div style={{ width: 24, height: 3, backgroundColor: '#000080' }} />
                      <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#000080' }} />
                      <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#000', border: '2px solid #000080' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right panel — Content */}
              <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                {/* Faded Background Image */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.15, pointerEvents: 'none' }}>
                  <img src={exp.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
                  {/* Gradients to blend the edges seamlessly into the card background */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #ffffff, transparent)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #ffffff, transparent)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, #ffffff, transparent 50%)' }} />
                </div>

                {/* Content wrapper */}
                <div className="relative z-10 p-6 md:p-10 lg:p-12 flex flex-col justify-between h-full overflow-y-auto">
                  <div>
                    <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '10px', color: '#000080', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 800, marginBottom: 18 }}>
                      {exp.org}
                    </div>
                    <h3 style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: 'clamp(1.4rem, 4vw, 2.8rem)', fontWeight: 900, color: '#000', textTransform: 'uppercase', lineHeight: 1.0, letterSpacing: '-0.03em', margin: 0, marginBottom: 16, whiteSpace: 'pre-line' }}>
                      {exp.title}
                    </h3>
                    <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '14px', color: '#555', lineHeight: 1.6, maxWidth: 520, margin: 0, marginBottom: 20 }}>
                      {exp.description}
                    </p>
                  </div>

                  <div>
                    {/* Tech tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                      {exp.tags.map(tag => (
                        <span key={tag} style={{ padding: '5px 13px', border: '1.5px solid #000', fontFamily: '"Inter", sans-serif', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#000', background: '#fff' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* Bottom rule */}
                    <div style={{ height: 1, background: 'linear-gradient(90deg, #000080 0%, #00008040 60%, transparent 100%)', maxWidth: 400 }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Bottom breathing room so last card unsticks cleanly */}
      <div style={{ height: 80 }} />
    </section>
  );
};

// ─── CONTACT ─────────────────────────────────────────────────────────────────

const Earth = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600,
      height: 600,
      phi: 0,
      theta: 0.2,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.9, 0.9, 0.9],
      markerColor: [0.1, 0.1, 0.1],
      glowColor: [1, 1, 1],
      markers: [
        { location: [20.2961, 85.8245], size: 0.1 }
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.004;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="w-full max-w-[280px] md:max-w-[360px] aspect-square relative opacity-80 -mt-6 md:-mt-12 overflow-hidden flex items-center justify-center">
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  );
};

const ContactSection = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://formsubmit.co/ajax/abhijeetsoren222@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });

      const result = await response.json();

      if (result.success === "true" || response.ok) {
        setStatus('success');
        formRef.current.reset();
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="py-[120px] bg-white text-black">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left panel */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col relative"
          >
            {/* Box with icon */}
            <div className="w-14 h-14 bg-gray-100 border border-black/5 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
              <Mail size={24} className="text-[#3b82f6]" />
            </div>

            <h2 className="text-5xl md:text-6xl font-bold text-black mb-6 tracking-tight leading-tight">
              Get in<br />touch
            </h2>
            <p className="text-gray-600 text-[17px] max-w-sm leading-relaxed mb-16">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Drop me a message!
            </p>



            {/* Globe */}
            <div className="mt-0 md:-mt-4 w-full flex justify-center md:justify-start md:-ml-8 pointer-events-none select-none">
              <Earth />
            </div>
          </motion.div>

          {/* Right panel - Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-gray-50 border border-gray-200 rounded-3xl p-8 lg:p-10 flex flex-col gap-6 w-full max-w-lg lg:ml-auto filter drop-shadow-xl"
          >
            {/* Subtle grid background on the form */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            <div className="relative z-10 flex flex-col gap-2">
              <label className="text-[13px] font-bold text-gray-800">Full name</label>
              <input type="text" name="name" required placeholder="Manu Arora" className="px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 text-black text-sm transition-colors placeholder:text-gray-400" />
            </div>

            <div className="relative z-10 flex flex-col gap-2">
              <label className="text-[13px] font-bold text-gray-800">Email Address</label>
              <input type="email" name="email" required placeholder="support@aceternity.com" className="px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 text-black text-sm transition-colors placeholder:text-gray-400" />
            </div>

            <div className="relative z-10 flex flex-col gap-2">
              <label className="text-[13px] font-bold text-gray-800">Company</label>
              <input type="text" name="company" placeholder="Aceternity Labs LLC" className="px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 text-black text-sm transition-colors placeholder:text-gray-400" />
            </div>

            <div className="relative z-10 flex flex-col gap-2">
              <label className="text-[13px] font-bold text-gray-800">Message</label>
              <textarea rows={4} name="message" required placeholder="Type your message here" className="px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 text-black text-sm transition-colors resize-none placeholder:text-gray-400" />
            </div>

            <div className="relative z-10 mt-2">
              <button disabled={status === 'loading'} type="submit" className="bg-black disabled:bg-gray-400 hover:bg-gray-800 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-300 w-full sm:w-auto min-w-[120px]">
                {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent!' : status === 'error' ? 'Error. Try Again' : 'Submit'}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

// ─── FOOTER ──────────────────────────────────────────────────────────────────

const Footer = () => (
  <footer className="bg-black text-white pt-16 pb-10 overflow-hidden">
    <div className="max-w-[1280px] mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-10 border-b border-white/10">
        <div>
          <div className="font-heading text-4xl uppercase tracking-tight text-white">ABHIJEET</div>
          <p className="text-gray-500 text-sm font-medium mt-1">Software Engineer focused on AI systems, backend architecture, and product development.</p>
        </div>
        <div className="flex flex-wrap gap-6">
          <a href="#about" className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">About</a>
          <a href="#projects" className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">Projects</a>
          <a href="#skills" className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">Skills</a>
          <a href="#experience" className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">Timeline</a>
          <a href="#contact" className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">Contact</a>
        </div>
      </div>
      <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-600 text-center md:text-left">© 2026 ABHIJEET SOREN. DESIGNED AND BUILT WITH INTENT.</span>
        <div className="flex gap-4">
          <a href="https://github.com/Abhijxxt14" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors"><Github size={16} /></a>
          <a href="https://linkedin.com/in/abhijeet-soren-a7654b2b5" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors"><Linkedin size={16} /></a>
          <a href="mailto:abhijeetsoren222@gmail.com" className="text-gray-600 hover:text-white transition-colors"><Mail size={16} /></a>
        </div>
      </div>
    </div>
  </footer>
);

// ─── Bokeh floating orbs ─────────────────────────────────────────────────────
const bokehOrbs = [
  { size: 320, top: '10%', left: '15%', color: 'rgba(0,0,128,0.22)', speed: 0.08 },
  { size: 220, top: '55%', left: '70%', color: 'rgba(0,0,160,0.16)', speed: 0.12 },
  { size: 180, top: '30%', left: '80%', color: 'rgba(0,0,128,0.12)', speed: 0.06 },
  { size: 260, top: '70%', left: '25%', color: 'rgba(0,0,200,0.14)', speed: 0.10 },
];

const BokehLayer = ({ mouseX, mouseY }: { mouseX: number; mouseY: number }) => (
  <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', overflow: 'hidden' }}>
    {bokehOrbs.map((orb, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          top: orb.top,
          left: orb.left,
          width: orb.size,
          height: orb.size,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
          filter: 'blur(40px)',
          transform: `translate(${mouseX * orb.speed * -60}px, ${mouseY * orb.speed * -60}px)`,
          transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          willChange: 'transform',
        }}
      />
    ))}
  </div>
);

const TransitionEngine = () => {
  const [isTransitioned, setIsTransitioned] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const aboutItemsRef = useRef<(HTMLDivElement | HTMLHeadingElement | HTMLParagraphElement | null)[]>([]);

  // ── Mouse tracking for hero effects ────────────────────────────────────────
  const [heroMouse, setHeroMouse] = useState({ x: 0, y: 0 });
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const btnWrapRef = useRef<HTMLDivElement>(null);
  const [btnBlob, setBtnBlob] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  // Mouse parallax + magnetic button
  useEffect(() => {
    if (isTransitioned) return;
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2; // -1..1
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setHeroMouse({ x: nx, y: ny });

      // Magnetic button pull
      const wrap = btnWrapRef.current;
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 100;
      if (dist < radius) {
        const pull = (radius - dist) / radius;
        wrap.style.transform = `translate(${dx * pull * 0.35}px, ${dy * pull * 0.35}px)`;
      } else {
        wrap.style.transform = 'translate(0px, 0px)';
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [isTransitioned]);

  const handleGetStarted = () => {
    if (isTransitioned || !containerRef.current || !heroContentRef.current || !mainContentRef.current) return;

    // Prevent scrolling during transition
    document.body.style.overflow = 'hidden';

    // Use button rect if available, else expand from viewport centre bottom
    const btnRect = buttonRef.current
      ? buttonRef.current.getBoundingClientRect()
      : { top: window.innerHeight * 0.75, left: window.innerWidth / 2 - 64, width: 128, height: 128 };

    // Create a clone of the button purely for the expansion animation
    const circleOverlay = document.createElement('div');
    circleOverlay.style.position = 'fixed';
    circleOverlay.style.top = `${btnRect.top}px`;
    circleOverlay.style.left = `${btnRect.left}px`;
    circleOverlay.style.width = `${btnRect.width}px`;
    circleOverlay.style.height = `${btnRect.height}px`;
    circleOverlay.style.borderRadius = '50%';
    circleOverlay.style.backgroundColor = '#f4f4f5'; // Light grey/white for next section
    circleOverlay.style.zIndex = '40'; // High z-index to cover hero
    circleOverlay.style.pointerEvents = 'none';
    circleOverlay.style.transformOrigin = 'center center';
    document.body.appendChild(circleOverlay);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioned(true);
        // Clean up overlay
        circleOverlay.remove();

        // Background is now light, Hero is hidden via state
        // Start animating About items in the main content:
        gsap.fromTo(aboutItemsRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power4.out', clearProps: 'all' }
        );

        // Restore scrolling
        document.body.style.overflow = 'auto';
        // Recalculate all ScrollTrigger positions once new sections have mounted
        setTimeout(() => ScrollTrigger.refresh(), 300);
      }
    });

    // Fade out hero text
    tl.to(heroContentRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.4,
      ease: 'power2.in'
    }, 0);

    // Expand the white portal rapidly
    tl.to(circleOverlay, {
      scale: 150,
      duration: 1.0,
      ease: 'power4.inOut' // Smooth but punchy expansion
    }, 0.2);
  };

  // Trigger transition on scroll/wheel while hero is active
  useEffect(() => {
    if (isTransitioned) return;
    const onScroll = () => handleGetStarted();
    window.addEventListener('wheel', onScroll, { once: true, passive: true });
    window.addEventListener('touchmove', onScroll, { once: true, passive: true });
    return () => {
      window.removeEventListener('wheel', onScroll);
      window.removeEventListener('touchmove', onScroll);
    };
  }, [isTransitioned]);

  // Reverse transition: scroll up at the top of main content → return to hero
  const handleReverseTransition = () => {
    if (!isTransitioned || !mainContentRef.current) return;

    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    // Full-screen overlay that will collapse back to a circle
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.backgroundColor = '#f4f4f5';
    overlay.style.zIndex = '50';
    overlay.style.pointerEvents = 'none';
    overlay.style.transformOrigin = 'center center';
    document.body.appendChild(overlay);

    const mainEl = mainContentRef.current;
    const tl = gsap.timeline();

    // Fade out main content
    tl.to(mainEl, { opacity: 0, duration: 0.25, ease: 'power2.in' }, 0);

    // Flip state and clear the GSAP inline opacity so CSS class takes over again
    tl.call(() => {
      gsap.set(mainEl, { clearProps: 'opacity' });
      setIsTransitioned(false);
    }, [], 0.3);

    // Collapse overlay from fullscreen to a dot at centre
    tl.to(overlay, {
      scale: 0,
      borderRadius: '50%',
      duration: 0.85,
      ease: 'power4.inOut',
      onComplete: () => overlay.remove(),
    }, 0.3);
  };

  // Listen for scroll-up at the very top while main content is visible
  useEffect(() => {
    if (!isTransitioned) return;
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY < 0 && window.scrollY === 0) handleReverseTransition();
    };
    const onTouch = (() => {
      let startY = 0;
      return {
        start: (e: TouchEvent) => { startY = e.touches[0].clientY; },
        move: (e: TouchEvent) => {
          if (window.scrollY === 0 && e.touches[0].clientY > startY + 30) handleReverseTransition();
        },
      };
    })();
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouch.start, { passive: true });
    window.addEventListener('touchmove', onTouch.move, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouch.start);
      window.removeEventListener('touchmove', onTouch.move);
    };
  }, [isTransitioned]);

  return (
    <div ref={containerRef} className={`relative w-full text-black ${!isTransitioned ? 'h-screen overflow-hidden' : ''}`}>
      {/* Aurora Hero View */}
      {!isTransitioned && (
        <div className="relative w-full h-screen overflow-hidden bg-black flex flex-col items-center justify-center">
          <AuroraBackground />
          {/* Bokeh depth layer — moves faster than bg for foreground 3-D feel */}
          <BokehLayer mouseX={heroMouse.x} mouseY={heroMouse.y} />

          <div ref={heroContentRef} className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4">
            <nav className="absolute top-0 w-full h-20 flex items-center justify-center">
              <div className="font-heading text-2xl tracking-tighter text-white uppercase drop-shadow">ABHIJEET</div>
            </nav>

            {/* Status pill — top-right corner */}
            <div style={{
              position: 'absolute', top: 28, right: 28, zIndex: 20,
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '6px 14px',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 999,
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(0,0,0,0.35)',
              fontFamily: 'monospace', fontSize: '10px',
              letterSpacing: '0.14em', color: 'rgba(255,255,255,0.75)',
              textTransform: 'uppercase', userSelect: 'none',
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                backgroundColor: '#22c55e',
                boxShadow: '0 0 6px #22c55e, 0 0 12px #22c55e88',
                animation: 'pulse-dot 2s ease-in-out infinite',
                flexShrink: 0,
              }} />
              AVAILABLE FOR ADVENTURES
            </div>

            {/* Hero name — mouse parallax tilt */}
            <h1
              ref={heroTextRef}
              className="font-heading m-0 uppercase drop-shadow-2xl leading-[0.8] text-center text-white"
              style={{
                fontSize: 'clamp(3.5rem, 14vw, 12rem)',
                letterSpacing: '-0.02em',
                zIndex: 10,
                transform: `translate(${heroMouse.x * -14}px, ${heroMouse.y * -8}px)`,
                transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1)',
                willChange: 'transform',
              }}
            >
              ABHIJEET SOREN
            </h1>
            <p
              className="mt-8 text-xl text-white/70 max-w-lg font-medium text-center z-10"
              style={{
                transform: `translate(${heroMouse.x * -6}px, ${heroMouse.y * -4}px)`,
                transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              Software Engineer building thoughtful digital products and practical AI systems.
            </p>

            {/* Magnetic button wrapper — position captured for pull effect */}
            <div
              ref={btnWrapRef}
              style={{ marginTop: '4rem', zIndex: 20, transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)', willChange: 'transform' }}
            >
              <button
                ref={buttonRef}
                onClick={handleGetStarted}
                onMouseEnter={() => { setBtnBlob(true); setBtnHovered(true); }}
                onMouseLeave={() => { setBtnBlob(false); setBtnHovered(false); }}
                className="group relative w-32 h-32 bg-white text-black flex flex-col items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.2)] overflow-hidden"
                style={{
                  borderRadius: btnBlob ? '40% 60% 70% 30% / 40% 50% 60% 50%' : '50%',
                  transition: 'border-radius 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.3s cubic-bezier(0.16,1,0.3,1)',
                  transform: btnBlob ? 'scale(1.07)' : 'scale(1)',
                }}
              >
                <span className="font-bold uppercase tracking-widest text-[#000000] text-xs mb-2 font-body">EXPLORE WORK</span>
                {/* Arrow loop — slides right and re-enters from left on hover */}
                <div style={{ position: 'relative', width: 24, height: 24, overflow: 'hidden' }}>
                  <ArrowRight
                    className="text-[#000000] absolute"
                    style={{
                      animation: btnHovered ? 'arrow-loop 0.5s linear infinite' : 'none',
                      top: 0, left: 0,
                    }}
                  />
                </div>
              </button>
            </div>

            {/* Scroll hint */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}
              onClick={handleGetStarted}
            >
              <span style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' }}>scroll</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v10M8 13l-4-4M8 13l4-4" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>
        </div>
      )}

      {/* Main Content (Revealed post transition) */}
      <div
        ref={mainContentRef}
        className={`${isTransitioned ? 'opacity-100' : 'opacity-0 pointer-events-none absolute top-0'} w-full bg-[#f4f4f5]`}
      >
        <Navbar />

        {/* About Section */}
        <section id="about" className="w-full min-h-screen flex flex-col pt-32 px-6 text-black pb-24 items-center bg-[#f4f4f5]">
          <div className="w-full max-w-[1280px] flex flex-col items-start gap-8 mt-12">
            <h2
              ref={el => { aboutItemsRef.current[0] = el; }}
              className="font-heading text-5xl md:text-7xl leading-[0.9] uppercase text-[#000080] m-0 tracking-tight"
            >
              ABOUT
            </h2>

            <p
              ref={el => { aboutItemsRef.current[1] = el; }}
              className="font-body text-2xl md:text-3xl font-semibold leading-relaxed max-w-3xl text-black"
            >
              I’m Abhijeet Soren, a software engineer based in India, currently pursuing a B.Tech in Computer Science at SOA University and building software that is reliable, useful, and thoughtfully engineered.
            </p>

            <p
              ref={el => { aboutItemsRef.current[2] = el; }}
              className="font-body text-lg text-gray-600 max-w-2xl leading-loose"
            >
              My work spans full-stack applications, AI-powered workflows, and real-time systems. I’m especially interested in scalable architecture, product clarity, and building tools that solve concrete problems well.
            </p>

            {/* Stats Grid */}
            <div
              ref={el => { aboutItemsRef.current[3] = el; }}
              className="mt-4 w-full grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                { value: '3+', label: 'Years Building' },
                { value: '10+', label: 'Projects Delivered' },
                { value: '6+', label: 'Core Domains' },
                { value: '2027', label: 'B.Tech CSE, SOA' },
              ].map((stat, i) => (
                <div key={i} className="p-6 bg-black text-white rounded-[20px] flex flex-col gap-2">
                  <div className="font-heading text-4xl text-[#000080]">{stat.value}</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Marquees />
        {isTransitioned && (
          <>
            <WorkExperienceSection />
            <ProjectsSection />
            <SkillsSection />
            <ExperienceSection />
            <ContactSection />
            <Footer />
          </>
        )}
      </div>
    </div >
  );
};

function App() {
  return (
    <div className="min-h-screen bg-black selection:bg-[var(--accent-orange)] selection:text-white">
      <TransitionEngine />
    </div>
  );
}

export default App;
