import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { observer } from "mobx-react";

import bonePng from "@/assets/bone.png";
import { Loader } from "@/components";

import { literalContent } from "../../../../constants";

import "./style.scss";

type Props = {
  blocks: any[];
  openModal: () => void;
  language: "ru" | "eng";
  loading: boolean;
};

export const ServicesCarousel = observer((props: Props) => {
  const { blocks = [], openModal, language, loading, lineGroups } = props;

  const titleAccessor = language === "ru" ? "title" : "title_en";
  const descriptionAccessor =
    language === "ru" ? "description" : "description_en";

  const scrollContainerRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const boneElement = document.querySelector("#bg-bone-image");
  const servicesContainer = document.querySelector("#services-container");
  const projectsContainer = document.querySelector("#projects");

  /* Анимация мокапа кости (замедление относительно скролла) */
  useGSAP(
    () => {
      if (!boneElement || !servicesContainer || !projectsContainer || loading)
        return null;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: servicesContainer,
          start: "top bottom+=500",
          end: "bottom top",
          scrub: true,
          onEnter: () => {
            console.log("Services container entered");
          },
        },
      });

      tl.to(boneElement, {
        y: () => servicesContainer.getBoundingClientRect().height,
        ease: "none",
      });
    },
    {
      dependencies: [
        boneElement,
        servicesContainer,
        loading,
        projectsContainer,
      ],
      scope: "services-container",
    },
  );

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

  if (loading) return <Loader />;

  if (!blocks?.length) {
    return null;
  }

  return (
    <div id="services-container">
      <img
        id="bg-bone-image"
        data-speed="0.6"
        src={bonePng}
        alt="3D Bone Mockup"
      />
      <div
        id="services"
        className="scroll-container"
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}>
        <div id="services-scroll-container">
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
    </div>
  );
});
