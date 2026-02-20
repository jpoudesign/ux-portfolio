import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getProject } from '../data/projects';
import { assetUrl } from '../utils/assetUrl';

export default function HomePage() {
  const [hoverImage, setHoverImage] = useState<string | null>(null);
  const getHoverImage = (slug: string) =>
    getProject(slug)?.list?.hoverImage ?? getProject(slug)?.info.image ?? null;
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
            <Link
              to="/projects/enterprise-design-system"
              className="project-link"
              data-project="enterprise-design-system"
              onMouseEnter={() => setHoverImage(getHoverImage('enterprise-design-system'))}
              onMouseLeave={() => setHoverImage(null)}
            >
              Enterprise Design System
            </Link>
          </p>
          <p className="project-group">
            <Link
              to="/projects"
              className="project-link"
              onMouseEnter={() => setHoverImage(null)}
              onMouseLeave={() => setHoverImage(null)}
            >
              EVAL - Umpire Evaluator tool
            </Link>
          </p>
          <p className="project-group">
            KeyBank:
          </p>
          <p className="project-group">
            <Link
              to="/projects"
              className="project-link"
              onMouseEnter={() => setHoverImage(null)}
              onMouseLeave={() => setHoverImage(null)}
            >
              Wealth Management Portal
            </Link>
          </p>
          <p className="project-group">
            Squared Labs:
          </p>
          <p className="project-group">
            <Link
              to="/projects"
              className="project-link"
              onMouseEnter={() => setHoverImage(null)}
              onMouseLeave={() => setHoverImage(null)}
            >
              Lincus - Academic Search Engine
            </Link>
          </p>
        </div>
        {hoverImage && (
          <div className="home-project-hover-image">
            <img src={assetUrl(hoverImage!)} alt="" />
          </div>
        )}
      </section>
      <footer className="home-footer">
        <Link to="/projects" className="footer-link">Passion Projects</Link>
        <Link to="/about" className="footer-link">About</Link>
      </footer>
    </div>
  );
}
