import { useRef, useEffect, useState } from 'react';
import ProcessCard, { ProcessCardData } from './ProcessCard';

interface HorizontalScrollSectionProps {
  id?: string;
  title: string;
  cards: ProcessCardData[];
}

export default function HorizontalScrollSection({ id, title, cards }: HorizontalScrollSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardsWrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const skipSnapRef = useRef(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  const checkOverflow = () => {
    const container = scrollRef.current;
    if (!container) return;
    setHasOverflow(container.scrollWidth > container.clientWidth);
  };

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, cards.length);
  }, [cards]);

  useEffect(() => {
    const runCheck = () => {
      requestAnimationFrame(() => {
        checkOverflow();
      });
    };
    runCheck();
    const container = scrollRef.current;
    const cardsWrap = cardsWrapRef.current;
    const ro = new ResizeObserver(runCheck);
    if (container) ro.observe(container);
    if (cardsWrap) ro.observe(cardsWrap);
    window.addEventListener('resize', runCheck);
    const timeout = setTimeout(runCheck, 150);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', runCheck);
      clearTimeout(timeout);
    };
  }, [id, cards]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    skipSnapRef.current = true;
    const container = scrollRef.current;
    const first = cardRefs.current[0];
    const gap = 24;
    const step = first ? first.offsetWidth + gap : 368;
    const delta = direction === 'right' ? step : -step;
    container.scrollBy({ left: delta, behavior: 'smooth' });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollLeft = 0;
    const raf = requestAnimationFrame(() => { container.scrollLeft = 0; });
    return () => cancelAnimationFrame(raf);
  }, [id, cards.length]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const handleScrollEnd = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (!container) return;
        if (skipSnapRef.current) {
          skipSnapRef.current = false;
          return;
        }
        const scrollLeft = container.scrollLeft;
        let nearestIndex = 0;
        let nearestDistance = Infinity;
        for (let i = 0; i < cardRefs.current.length; i++) {
          const card = cardRefs.current[i];
          if (card) {
            const distance = Math.abs(scrollLeft - card.offsetLeft);
            if (distance < nearestDistance) {
              nearestDistance = distance;
              nearestIndex = i;
            }
          }
        }
        const nearestCard = cardRefs.current[nearestIndex];
        if (nearestCard && nearestDistance > 5) {
          container.scrollTo({ left: nearestCard.offsetLeft, behavior: 'smooth' });
        }
      }, 150);
    };
    container.addEventListener('scroll', handleScrollEnd);
    return () => {
      container.removeEventListener('scroll', handleScrollEnd);
      clearTimeout(scrollTimeout);
    };
  }, [cards]);

  return (
    <section className="horizontal-scroll-section" id={id}>
      <div className="subsection-constrained">
        <div className="subsection-meta subsection-meta--top">
          <div className="subsection-header">
            <h2 className="subsection-title">{title}</h2>
          </div>
        </div>
        <div className="subsection-scroll" ref={scrollRef}>
          <div className="subsection-cards-wrap" ref={cardsWrapRef}>
            {cards.map((card, i) => (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="process-card-wrapper"
              >
                <ProcessCard data={card} />
              </div>
            ))}
          </div>
        </div>
        <div className="subsection-meta subsection-meta--bottom">
          <div className="subsection-spacer" aria-hidden="true" />
          {hasOverflow && (
            <div className="subsection-nav">
              <button
                className="chevron-btn"
                onClick={() => scroll('left')}
                aria-label="Scroll left"
              >
                <i className="fa-solid fa-chevron-left" />
              </button>
              <button
                className="chevron-btn"
                onClick={() => scroll('right')}
                aria-label="Scroll right"
              >
                <i className="fa-solid fa-chevron-right" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
