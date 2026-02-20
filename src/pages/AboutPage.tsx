export default function AboutPage() {
  return (
    <>
      <div className="about-page">
        <section className="about-hero">
          <div className="about-photo-wrap">
          <img
            src="/assets/jared.jpg"
            alt="Jared Poulsen"
            className="about-photo"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).nextElementSibling?.classList.add('about-photo-placeholder--show');
            }}
          />
          <div className="about-photo-placeholder">
            <span>Jared Poulsen</span>
          </div>
        </div>
        <div className="about-bio">
          <p>
            I'm a designer specializing in design systems, visual design, and web development. Some of my work includes creating MLB's Internal Tools design system, KeyBank's Wealth Management portal, and freelance design services for various clients. I value data-driven design and strive to make a measurable impact on every project I work on. We spend much of our lives looking at screens, so I take responsibility in my role knowing the available opportunity to shape our digital landscape in a positive direction.
          </p>
          <h2 className="about-expertise-title">Areas of Expertise:</h2>
          <p className="about-expertise">
            UX / UI / Product Design, Web Development, Graphic Design, Video Editing
          </p>
          <a href="mailto:jaredpoulsendesign@gmail.com" className="cta-btn about-email-btn">
            Email me
          </a>
        </div>
        </section>
      </div>
      <section className="about-notion">
        <h2 className="about-section-title">Reading list</h2>
        <iframe
          src="https://silent-pluto-4f3.notion.site/ebd/2d1e2f70f3d380bb8faecb9d59f6326f?embed"
          title="Notion reading list"
          className="notion-embed"
        />
      </section>
    </>
  );
}
