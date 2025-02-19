import { useRef, useState } from "react";

import { literalContent } from "../../../../constants";

import "./style.scss";

type Props = {
  blocks: any[];
  openModal: () => void;
  language: "ru" | "eng";
};

export const ServicesCarousel = (props: Props) => {
  const { blocks = [], openModal, language } = props;

  const titleAccessor = language === "ru" ? "title" : "title_en";
  const descriptionAccessor =
    language === "ru" ? "description" : "description_en";

  const scrollContainerRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDown(true);
    scrollContainerRef.current.style.cursor = "grabbing";
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
    scrollContainerRef.current.style.cursor = "grab";
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1; // Увеличьте коэффициент для большей скорости
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  if (!blocks?.length) {
    return null;
  }

  return (
    <div
      id="services"
      className="scroll-container"
      ref={scrollContainerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}>
      <div
        id="services-scroll-container"
        style={{ width: `${blocks?.length * 100}%` }}>
        {blocks.map((tileContent, index) => (
          <div key={index} id={`panel-${index + 1}`} className="panel">
            <div className="service-tile">
              <div className="service-tile--title">
                {tileContent[titleAccessor]}:
              </div>
              <div className="service-tile--description">
                {tileContent[descriptionAccessor]}
              </div>
              <button className="service-tile--action" onClick={openModal}>
                {literalContent.order[language]?.toUpperCase()}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
