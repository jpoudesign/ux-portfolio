import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  image?: string;
  children?: React.ReactNode;
}

export default function Lightbox({ isOpen, onClose, title, image, children }: LightboxProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const content = (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        {title && <h3 className="lightbox-title">{title}</h3>}
        {children && <div className="lightbox-extra">{children}</div>}
        {image && (
          <div className="lightbox-image-wrap">
            <img src={image} alt={title || 'Enlarged view'} />
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
