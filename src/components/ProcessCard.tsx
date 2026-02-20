import { useState } from 'react';
import Lightbox from './Lightbox';
import { assetUrl } from '../utils/assetUrl';

export interface ProcessCardData {
  header: string;
  text: string;
  image?: string;
  headerImage?: string;
  lightboxContent?: React.ReactNode;
  lightboxImage?: string;
}

interface ProcessCardProps {
  data: ProcessCardData;
}

export default function ProcessCard({ data }: ProcessCardProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <article className="process-card">
        {data.header && (
          <h3 className="process-card-header">
            {data.header}
            {data.headerImage && (
              <img src={assetUrl(data.headerImage)} alt="" className="process-card-header-img" />
            )}
          </h3>
        )}
        <p className="process-card-text">{data.text}</p>
        {data.image && (
          <div className="process-card-image">
            <img src={assetUrl(data.image)} alt={data.header} />
          </div>
        )}
        <button
          className="process-card-zoom"
          onClick={() => setLightboxOpen(true)}
          aria-label="View enlarged"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>
      </article>
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        title={data.header}
        image={(data.lightboxImage ?? data.image) ? assetUrl(data.lightboxImage ?? data.image!) : undefined}
      >
        {data.lightboxContent ?? <p>{data.text}</p>}
      </Lightbox>
    </>
  );
}
