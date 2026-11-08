import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './gallery-hover-carousel.css';

export default function GalleryHoverCarousel({ heading, description, items = [] }) {
  const [viewportRef, api] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps', breakpoints: { '(max-width: 768px)': { dragFree: true } } });
  const [navigation, setNavigation] = useState({ prev: false, next: false });

  useEffect(() => {
    if (!api) return;
    const update = () => setNavigation({ prev: api.canScrollPrev(), next: api.canScrollNext() });
    update();
    api.on('select', update).on('reInit', update);
    return () => { api.off('select', update).off('reInit', update); };
  }, [api]);

  return (
    <div className="gallery-hover-carousel" role="region" aria-roledescription="băng chuyền" aria-labelledby="topic-list-title">
      <div className="topic-section-heading gallery-heading">
        <div>
          <p className="eyebrow">TÌM ĐIỀU BẠN QUAN TÂM</p>
          <h2 id="topic-list-title">{heading}</h2>
          <p className="gallery-description">{description}</p>
        </div>
        <div className="gallery-navigation">
          <span className="topics-catalog-count">{items.length} chủ đề hiện có</span>
          <button type="button" aria-label="Chủ đề trước" aria-controls="topic-carousel-track" disabled={!navigation.prev} onClick={() => api?.scrollPrev()}><ChevronLeft size={20} aria-hidden="true" /></button>
          <button type="button" aria-label="Chủ đề tiếp theo" aria-controls="topic-carousel-track" disabled={!navigation.next} onClick={() => api?.scrollNext()}><ChevronRight size={20} aria-hidden="true" /></button>
        </div>
      </div>
      {items.length ? <div className="gallery-viewport" ref={viewportRef}>
        <div className="gallery-track" id="topic-carousel-track">
          {items.map((item, index) => (
            <div className="gallery-slide" key={item.id} role="group" aria-roledescription="trang chiếu" aria-label={`${index + 1} / ${items.length}`}>
              <Link className="gallery-card" to={item.url} onFocus={() => api?.scrollTo(index)}>
                <img className="gallery-image" src={item.image} alt="" width="1200" height="550" loading="lazy" decoding="async" />
                <span className="gallery-rest-title" aria-hidden="true">{item.title}</span>
                <div className="gallery-caption">
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <span className="gallery-action">Khám phá chủ đề <span className="gallery-arrow"><ArrowRight size={18} aria-hidden="true" /></span></span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div> : <p className="topics-empty">Các chủ đề đang được chuẩn bị. Bạn hãy quay lại sau để khám phá nội dung mới.</p>}
    </div>
  );
}
