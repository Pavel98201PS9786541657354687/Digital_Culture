import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useKeenSlider } from "keen-slider/react";
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
  const { blocks = [], openModal, language, loading } = props;

  const titleAccessor = language === "ru" ? "title" : "title_en";
  const descriptionAccessor =
    language === "ru" ? "description" : "description_en";

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

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    mode: "free",
    slides: {
      perView: "auto",
      origin: "center",
    },
    breakpoints: {
      600: {
        slides: {
          perView: 1,
        },
      },
    },
  });

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
        id="services-scroll-container"
        ref={sliderRef}
        className="keen-slider">
        {blocks.map((tileContent, index) => (
          <div key={index} className="keen-slider__slide panel">
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
});
