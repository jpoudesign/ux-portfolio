import { Link } from 'react-router-dom';
import { getPassionProjectsForList } from '../data/projects';

export default function ProjectsPage() {
  const projects = getPassionProjectsForList();
  return (
    <div className="projects-page">
      <section className="page-header">
        <h1>Passion Projects</h1>
        <p>Case studies and design explorations</p>
      </section>
      <div className="projects-grid">
        {projects.map((p) => (
          <Link key={p.slug} to={`/projects/${p.slug}`} className="project-card">
            <h3>{p.title}</h3>
            <p>{p.subtitle}</p>
            <div className="project-tags">
              {p.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
