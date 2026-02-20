import { useParams, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import HorizontalScrollSection from '../components/HorizontalScrollSection';
import { getProject } from '../data/projects';
import { assetUrl } from '../utils/assetUrl';

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : null;
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [chaosInView, setChaosInView] = useState(false);
  const [navStuck, setNavStuck] = useState(false);
  const chaosRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const chaosSubsections = project?.chaos.subsections ?? [];
  const orderSubsections = project?.order.subsections ?? [];
  const getSubsectionId = (s: { id?: string; title: string }) =>
    s.id ?? s.title.toLowerCase().replace(/\s+/g, '-');
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const subsectionIds = [
    ...chaosSubsections.map(getSubsectionId),
    ...orderSubsections.map(getSubsectionId),
  ];

  useEffect(() => {
    const el = chaosRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setChaosInView(entry.isIntersecting),
      { threshold: 0, rootMargin: '-1px 0px 0px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [project]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const check = () => {
      const top = nav.getBoundingClientRect().top;
      setNavStuck(top <= 1);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, [project]);

  useEffect(() => {
    if (!project || subsectionIds.length === 0) return;

    const elements = subsectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const mostVisible = visible.reduce((a, b) =>
          (b.intersectionRatio ?? 0) > (a.intersectionRatio ?? 0) ? b : a
        );
        setActiveSection(mostVisible.target.id);
      },
      { threshold: 0.2, rootMargin: '-80px 0px -50% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [project, subsectionIds.join(',')]);

  if (!project) {
    return (
      <div className="project-page">
        <p>Project not found.</p>
        <Link to="/projects">Back to projects</Link>
      </div>
    );
  }

  return (
    <div className="project-page">
      {/* Hook Section */}
      <section
        className="hook-section"
        style={project.hook.backgroundImage ? { backgroundImage: `url(${assetUrl(project.hook.backgroundImage)})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
      >
        <div className="hook-content">
          {project.hook.lines.map((line, i) => {
            if (line.type === 'header') {
              return <p key={i} className="hook-line hook-line--header">{line.text}</p>;
            }
            if (line.type === 'jared-link') {
              return (
                <a key={i} href="#project-info-section" className="hook-line hook-line--jared" onClick={(e) => scrollToSection(e, 'project-info-section')}>
                  {line.text}
                </a>
              );
            }
            return <p key={i} className="hook-line">{line.text}</p>;
          })}
        </div>
      </section>

      {/* Project Info Section */}
      <section className="project-info-section" id="project-info-section">
        <div className="project-info-grid">
          <div className="project-info-visuals">
            {project.info.image ? (
              <div className="project-info-image-wrap">
                <img src={assetUrl(project.info.image)} alt="Project details" className="project-info-image" />
              </div>
            ) : (
              <div className="visual-placeholder">
                <div className="color-swatches">
                  <span className="swatch primary">Primary</span>
                  <span className="swatch secondary">Secondary</span>
                  <span className="swatch tertiary">Tertiary</span>
                </div>
              </div>
            )}
          </div>
          <div className="project-info-text">
            <h2>Case Study</h2>
            <h3>{project.info.caseStudy}</h3>
            <div className="project-info-fields">
              <div className="project-info-block">
                <p><strong>Background:</strong> {project.info.background}</p>
              </div>
              <div className="project-info-objective">
                <p><strong>Objective:</strong> {project.info.objective}</p>
              </div>
              <div className="project-info-meta">
                <p><strong>Role:</strong> {project.info.role}</p>
                <p><strong>Team:</strong> {project.info.team}</p>
              </div>
            </div>
            <a href="#order-intro" className="skip-btn" onClick={(e) => scrollToSection(e, 'order-intro')}>Skip to Solutions</a>
          </div>
        </div>
      </section>

      {/* Section Navigation - derived from project data */}
      <nav ref={navRef} className={`section-nav ${chaosInView && navStuck ? 'section-nav--dark' : ''}`}>
        <div className="section-nav-group">
          <a href="#chaos" className="nav-label" onClick={(e) => scrollToSection(e, 'chaos')}>CHAOS</a>
          <span className="nav-sep">//</span>
          {chaosSubsections.map((sub) => {
            const id = getSubsectionId(sub);
            return (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''} onClick={(e) => scrollToSection(e, id)}>
                {sub.title}
              </a>
            );
          })}
        </div>
        <span className="nav-sep nav-sep-pipe">|</span>
        <div className="section-nav-group">
          <span className="nav-label">ORDER</span>
          <span className="nav-sep">//</span>
          {orderSubsections.map((sub) => {
            const id = getSubsectionId(sub);
            return (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''} onClick={(e) => scrollToSection(e, id)}>
                {sub.title}
              </a>
            );
          })}
        </div>
      </nav>

      {/* Chapter 1 CHAOS intro */}
      <section className="chaos-intro-section">
        <div className="chaos-intro-inner">
          <div className="chaos-intro-heading-wrap">
            <h3 className="chaos-intro-part">Chapter 1</h3>
            <h1 className="chaos-intro-word">CHAOS</h1>
          </div>
          <div className="chaos-intro-image-wrap">
            <img src={assetUrl('/assets/chaos-board.png')} alt="" className="chaos-intro-image" />
          </div>
        </div>
      </section>

      {/* CHAOS Section */}
      <section ref={chaosRef} className="main-section chaos-section" id="chaos">
        {chaosSubsections.map((sub) => (
          <HorizontalScrollSection
            key={getSubsectionId(sub)}
            id={getSubsectionId(sub)}
            title={sub.title}
            cards={sub.question ? [{ header: '', text: sub.question }, ...sub.cards] : sub.cards}
          />
        ))}
      </section>

      {/* Chapter 2 ORDER intro */}
      <section className="order-intro-section" id="order-intro">
        <div className="order-intro-inner">
          <div className="order-intro-heading-wrap">
            <h3 className="order-intro-part">Chapter 2</h3>
            <h1 className="order-intro-word">ORDER</h1>
          </div>
          <div className="order-intro-image-wrap">
            <img src={assetUrl('/assets/chaos-board.png')} alt="" className="order-intro-image" />
          </div>
        </div>
      </section>

      {/* ORDER Section */}
      <section className="main-section order-section" id="order">
        {orderSubsections.map((sub) => (
          <HorizontalScrollSection
            key={getSubsectionId(sub)}
            id={getSubsectionId(sub)}
            title={sub.title}
            cards={sub.question ? [{ header: '', text: sub.question }, ...sub.cards] : sub.cards}
          />
        ))}
      </section>
    </div>
  );
}
