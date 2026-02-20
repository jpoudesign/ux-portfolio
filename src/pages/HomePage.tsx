import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="homepage">
      <section className="home-content">
        <div className="home-intro">
          <div className="home-title-group">
            <p className="home-line">Product Design + Design Systems</p>
            <p className="home-line">Queens, NY</p>
          </div>
          <p className="home-interests">
            Recent interests: language learning, mixed martial arts, charcoal sketching, drumming, strength training, and the Mortimer Adler 10-year reading list.
          </p>
          <p className="home-emoji">👾</p>
        </div>
        <div className="home-projects">
          <p className="project-group">
            Major League Baseball:
          </p>
          <p className="project-group">
            <Link to="/projects/enterprise-design-system" className="project-link project-link--lava">
              Enterprise Design System
            </Link>
          </p>
          <p className="project-group">
            <Link to="/projects/eval" className="project-link">
              EVAL - Umpire Evaluator tool
            </Link>
          </p>
          <p className="project-group">
            KeyBank:
          </p>
          <p className="project-group">
            <Link to="/projects/wealth-management-portal" className="project-link">
              Wealth Management Portal
            </Link>
          </p>
          <p className="project-group">
            Squared Labs:
          </p>
          <p className="project-group">
            <Link to="/projects/lincus" className="project-link">
              Lincus - Academic Search Engine
            </Link>
          </p>
        </div>
      </section>
      <footer className="home-footer">
        <Link to="/projects" className="footer-link">Passion Projects</Link>
        <Link to="/about" className="footer-link">About</Link>
      </footer>
    </div>
  );
}
